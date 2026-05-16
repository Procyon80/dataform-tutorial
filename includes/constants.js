// Reusable constants used by SQLX models.
// In Dataform, JavaScript files in includes/ can be referenced from SQLX
// using the `constants` object name (derived from file name).

module.exports = {
  tutorialTags: ["tutorial", "dataform"],

  // Layer-specific tag groups — combine with tutorialTags via .concat()
  stagingTags: ["staging"],
  intermediateTags: ["intermediate"],
  martTags: ["mart"],
  assertionTags: ["assertion", "data_quality"],
  usaNamesSource: {
    database: "bigquery-public-data",
    schema: "usa_names",
    name: "usa_1910_current"
  },
  shakespeareSource: {
    database: "bigquery-public-data",
    schema: "samples",
    name: "shakespeare"
  }
};
