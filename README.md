# Fort-Discord-RPC
Fort-Discord-RPC is a tool which sets your Fortnite level as your Discord status.

<img align="middle" src="https://i.imgur.com/ClHl87i.png" width="350px" draggable="false">

## Requirements
- [NodeJS](https://nodejs.org/en/download/)
- [FortniteAPI.io API Key](https://dashboard.fortniteapi.io)
- [Discord Desktop App](https://discord.com/brand-new/download)

## Usage
1. Run `install.bat` to install all dependencies.
2. Open `config.json` in your preferred text editor, fill in the configurable values. Once finished, make sure to save.

- `apiKey`: Replace with your [FortniteAPI.io API Key](https://dashboard.fortniteapi.io).
- `username`: Replace with your Fortnite username.
- `text`: Replace with the text you wish to be displayed as your status. {level} is needed to display your level, it will be replaced with your actual level.
- `timeOut`: The interval between each request to check if your level has changed. Default is `300000` (5 minutes).

3. Run `start.bat` 
4. Voila, you are now done 

## Support
If you need any help, encounter any issues, or just have a suggestion, feel free to join our discord server at: discord.gg/carbide or open an issue in this repository.

## Credits
- Current level data provided by [FortniteAPI.io](https://fortniteapi.io/)
- Setting Discord Status uses [Discord-RPC](https://www.npmjs.com/package/discord-rpc)
- Coded with ❤️ by Im2rnado
