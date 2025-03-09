const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "ᎶጀᏒ ⋮ ᴍᴏɴᴀʀᴄʜ V3",
    exifPack: process.env.EXIF_PACK || "GRIM REAPERS",
    exifAuthor: process.env.EXIF_AUTHOR || "ᎶጀᏒ ⋮ ᴍᴏɴᴀʀᴄʜ",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0d6S2pOV2dDUHJ1UkdXRlp5bklDNnNIcDlkSzdzR0k0Y1JrVXB4Z2RuYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2dFMXdKbGt6RFNncWdYY1A0dFh2Wmp3ZTQ5czVVckZNMTl2UUhkVmRnUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTWtVeXpUMHZzeU9NNmhKSWIrNkFWdy9Cb1hmWXpUYnZvSGIvTmZKbmxFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlZ0ZMRDYwYnFncWdWcHFLN05PRlEwaWRsaWtGNmI1cTFyUFVjNThpZ0IwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFMR1ZWWGhhMDNBcjJscnlYZ3kzYzlNY25aQlZaOGdMYkpOc2ZIMTkvMzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBLeUlMbkczemxLZ08yT0FiRjhrSFgyeE9qZC9JSG1XM3U2OFd5ZjVybm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUJ4aDFoZ2gzRVJkT3JnS3k2VnRrdWMvRU5QZ0grZERaSUhsK0xsMUYwND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWG5HWHJtZXBOVDIwdCt1ZEVrSXFsWHhSUTZUOW1IYmFNQVFiTkNIRjhqZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhneTFMVXM0NG9rcjRXOWFiWG9mSzc0YjdueDJNTU0zdzVEOWJJek83emNyUnVaYkJ4ZjlnVlNMb09Wc3VDNHhnMHhqRzNScWcyQjBBWStMdU8vRURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQwLCJhZHZTZWNyZXRLZXkiOiJTbGpxdkVkMk9nNURUVC9nVzMxMXFWSGh6Y3RsMTh6ejBPRzUwTG16YmY0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJZUlpBMTlISyIsIm1lIjp7ImlkIjoiMjM0ODA4NzMwMTk3NzozM0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI2MjcxNTEyOTk5OTU2NTozM0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09MaWhjTUdFTVgrdHI0R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImQ2VkpUNitEZG9FR0ZmUDdRVDhzdWpXb3ZmWUsvczl0YXNyVHpPRXNlUWM9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ild2QjdHYlh0SmxPZmdwanUzYmhEVDhhQ3pqTklKUytCVE4vRG5nMG82TWFFQlJBSFA3dDlqSWd1Z0VUZEpXYWcvU0c4bkpZa25tWm1YM2lkTUY2dUNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYWXNGT0tRYnFLL3I4Z0VncWNpSWQ4TmdsZE8wRUU3SU5DVjFGM3hLbFRSTmZkUCtHcjRUS0ViM2cySXJWUUJOUzFNbUh5T3lrbHNvVDZyandOMjdDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwODczMDE5Nzc6MzNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWGVsU1UrdmczYUJCaFh6KzBFL0xMbzFxTDMyQ3Y3UGJXckswOHpoTEhrSCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxNTM3MTA2LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5MTyJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
