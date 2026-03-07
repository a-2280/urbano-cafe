import { google } from "googleapis";
import { unstable_cache } from "next/cache";

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

export const getMenuItems = unstable_cache(
  async (sheetName) => {
    try {
      const sheets = google.sheets({ version: "v4", auth });

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: `'${sheetName}'!A:D`,
      });

      const rows = response.data.values ?? [];

      return rows
        .slice(1)
        .filter((row) => row[1])
        .map((row) => ({
          section: row[0] ?? "",
          name: row[1] ?? "",
          description: row[2] ?? "",
          price: row[3] ?? "",
        }));
    } catch (err) {
      console.error(`[sheets] Failed to fetch "${sheetName}":`, err.message);
      return [];
    }
  },
  ["menu-items"],
  { revalidate: 300 }
);
