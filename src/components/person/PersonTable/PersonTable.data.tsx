import { CheckBoxTableColumnType } from "@/components/common/table/CheckboxTable/CheckboxTable.type";
import { PersonTableDataType } from "./PersonTable.type";

export const personColumns: CheckBoxTableColumnType<PersonTableDataType>[] = [
  {
    key: "fullname",
    headerName: "이름",
    render: (value) => <>{!!value ? value : "-"}</>,
    sortable: true,
  },
  {
    key: "email",
    headerName: "이메일",
    render: (value) => <>{!!value ? value : "-"}</>,
    sortable: true,
  },
  {
    key: "birthday",
    headerName: "생일",
    render: (value) => <>{!!value ? value : "-"}</>,
    sortable: true,
  },
];
