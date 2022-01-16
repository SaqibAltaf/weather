import { Country } from 'country-state-city';


export const countries = Country.getAllCountries().map((val) => ({
  code: val.isoCode,
  name: val.name,
  currency: val.currency
}));

export const localization = {
  pagination: {
    lastTooltip: "end",
    firstTooltip: "start",
    previousTooltip: "previous",
    nextTooltip: "next",
    labelRowsSelect: "rows",
  },

  body: {
    emptyDataSourceMessage: "No history about this city",
  },
  grouping: {
    placeholder: "Drag and drop to group data",
    groupedBy: "Group by",
  },
};

export const tableOptions = {
  rowStyle: {
    backgroundColor: "#EEE",
  },
  grouping: true,
  pageSizeOptions: [2, 5],
  actionsColumnIndex: -1,
};

export const cityHistoryColumns = [
  {
    title: "Date",
    field: "date",
  },
  {
    title: "Condition",
    field: "day.condition.text",
  },
  {
    title: "Condition Code",
    field: "day.condition.code",
  },
  {
    title: "Weather Icon",
    field: "day.condition.icon",
  },
];
