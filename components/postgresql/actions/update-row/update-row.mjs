import postgresql from "../../postgresql.app.mjs";

export default {
  name: "Update Row",
  key: "postgresql-update-row",
  description: "Updates an existing row. [See Docs](https://node-postgres.com/features/queries)",
  version: "0.0.3",
  type: "action",
  props: {
    postgresql,
    table: {
      propDefinition: [
        postgresql,
        "table",
      ],
    },
    column: {
      propDefinition: [
        postgresql,
        "column",
        (c) => ({
          table: c.table,
        }),
      ],
      label: "Lookup Column",
      description: "Find row to update by searching for a value in this column. Returns first row found",
    },
    value: {
      propDefinition: [
        postgresql,
        "value",
        (c) => ({
          table: c.table,
          column: c.column,
        }),
      ],
    },
    rowValues: {
      propDefinition: [
        postgresql,
        "rowValues",
      ],
    },
    rejectUnauthorized: {
      propDefinition: [
        postgresql,
        "rejectUnauthorized",
      ],
    },
  },
  async run({ $ }) {
    const {
      table,
      column,
      value,
      rowValues,
      rejectUnauthorized,
    } = this;
    try {
      const res = await this.postgresql.updateRow(
        table,
        column,
        value,
        rowValues,
        rejectUnauthorized,
      );
      const summary = res
        ? "Row updated"
        : "Row not found";
      $.export("$summary", summary);
      return res;
    } catch (error) {
      throw new Error(`
      Row not updated due to an error. ${error}.
      This could be because SSL verification failed, consider changing the Reject Unauthorized prop and try again.
    `);
    }
  },
};
