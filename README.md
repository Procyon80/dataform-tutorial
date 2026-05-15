# Dataform Tutorial Project

This repository contains a **default Dataform structure** with several SQLX models,
all heavily commented so you can learn how dependencies and execution order work.

## 1) Project Structure

```text
.
├── dataform.json
├── package.json
├── includes/
│   └── constants.js
└── definitions/
	 ├── sources/
	 │   ├── public_sources.sqlx
	 │   └── src_shakespeare.sqlx
	 ├── staging/
	 │   ├── stg_usa_names.sqlx
	 │   └── stg_shakespeare.sqlx
	 ├── intermediate/
	 │   └── int_name_trends_by_state.sqlx
	 ├── marts/
	 │   ├── mart_top_names_latest_year.sqlx
	 │   └── mart_shakespeare_top_words.sqlx
	 └── assertions/
		  └── assert_top_names_positive_births.sqlx
```

## 2) What Each Layer Means

1. `sources/`: External tables that already exist (public BigQuery tables).
2. `staging/`: First cleanup and renaming layer.
3. `intermediate/`: Business-friendly transformed logic and aggregates.
4. `marts/`: Final analytics outputs for reports and consumers.
5. `assertions/`: Data quality checks that should return 0 rows.

## 3) Dependency Graph (How Dataform Understands Order)

Dataform creates a DAG from `ref()` usage.

```text
usa_1910_current ──> stg_usa_names ──> int_name_trends_by_state ──> mart_top_names_latest_year ──> assert_top_names_positive_births

shakespeare ──> stg_shakespeare ──> mart_shakespeare_top_words
```

Because each model references upstream models with `${ref("...")}`:

- Dataform runs parents before children.
- If upstream code changes, only impacted downstream nodes are re-built.
- You avoid hardcoding physical table names and keep lineage transparent.

## 4) Public Free Sources Used

1. `bigquery-public-data.usa_names.usa_1910_current`
2. `bigquery-public-data.samples.shakespeare`

These are free public datasets (BigQuery public data program), useful for tutorials.

## 5) How to Run

1. Install dependencies:

	```bash
	npm install
	```

2. Compile graph:

	```bash
	npm run compile
	```

3. Run pipeline:

	```bash
	npm run run
	```

## 6) How to Learn From This Repo

1. Start with `definitions/sources/*` to understand declarations.
2. Follow each `${ref("...")}` chain layer by layer.
3. Open Dataform graph view after compile and compare it with the DAG above.
4. Inspect the assertion to learn how data tests are modeled in SQLX.

## 7) Important Config Notes

- Update `defaultDatabase` in `dataform.json` to your GCP project ID.
- `defaultSchema` is where tables/views are published by default.
- `assertionSchema` is where assertion results are stored.
- `vars.tutorial_start_year` is used by staging logic for filter parameterization.
