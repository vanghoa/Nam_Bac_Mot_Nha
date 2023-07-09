import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./sanity/schemas";

const config = defineConfig({
  projectId: "v8tyeiuu",
  dataset: "production",
  title: "Nam Bac Mot Nha",
  apiVersion: "2023-09-05",
  basePath: "/assmin",
  plugins: [deskTool(), visionTool()],
  schema: { types: schemas },
});

export default config;
