const rpc = require("discord-rpc");
const axios = require("axios");
const { username, text, apiKey, timeOut } = require("./config.json");

if (!username) return console.error("❌ You did not supply an account username!");

(async () => {
    const accId = await axios.get(`https://fortniteapi.io/v1/lookup?username=${encodeURI(username)}`, {
        headers: {
            "Authorization": apiKey,
        },
    }).catch(console.error);

    if (accId.data.error) return console.error("❌ The username you supplied is invalid!");
    console.log(`Successfully fetched acccount ${username} (${accId.data.account_id})`);

    const level = await getLevel(accId.data.account_id);

    const client = new rpc.Client({ transport: "ipc" });

    client.on("ready", () => {
        client.request("SET_ACTIVITY", {
            pid: process.pid,
            activity: {
                details: text.replace("{level}", level) || `My current Fortnite level is ${level}!`,
                assets: {
                    large_image: "fortnite",
                    large_text: "Fortnite Stats",
                    small_image: "fortnite",
                    small_text: "Fortnite Stats",
                },
                buttons: [{
                    label: "Github Page",
                    url: "https://github.com/Im2rnado/Fortnite-Discord-RPC/"
                }
                ]
            }
        });

        console.log("RPC is online!");
    });

    setInterval(myCallback, timeOut);

    async function myCallback() {
        const newLevel = await getLevel(accId.data.account_id);

        client.request("SET_ACTIVITY", {
            pid: process.pid,
            activity: {
                details: text.replace("{level}", newLevel) || `My current Fortnite level is ${newLevel}!`,
                assets: {
                    large_image: "fortnite",
                    large_text: "Fortnite Stats",
                    small_image: "fortnite",
                    small_text: "Fortnite Stats",
                },
                buttons: [{
                    label: "Github Page",
                    url: "https://github.com/Im2rnado/Fortnite-Discord-RPC/"
                }
                ]
            }
        });
    }

    client.login({ clientId: "847089646119026699" }).catch(console.error);
})();

async function getLevel(accId) {
    const stats = await axios.get(`https://fortniteapi.io/v1/stats?account=${accId}`, {
        headers: {
            "Authorization": apiKey,
        },
    }).catch(console.error);

    console.log(`Successfully fetched level for ${stats.data.name} - Level ${stats.data.account.level}`)
    return stats.data.account.level;
}