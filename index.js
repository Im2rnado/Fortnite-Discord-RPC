const rpc = require("discord-rpc");
const axios = require("axios");
const { username, text, timeOut } = require("./config.json");

if (!username) return console.error("You did not supply an account username!");

(async () => {
    const level = await getLevel(username);

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
        const newLevel = await getLevel(username);

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

async function getLevel(username) {
    const stats = await axios.get(`https://fortnite-api.com/v1/stats/br/v2?name=${username}`);
    
    if (stats.data.error) return console.error("An error has occured: " + stats.data.error);

    console.log(`Successfully fetched level for ${stats.data.data.account.name} - Level ${stats.data.data.battlePass.level}`)
    return stats.data.data.battlePass.level;
}
