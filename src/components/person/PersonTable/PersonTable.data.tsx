import { CheckBoxTableColumnType } from "@/components/common/table/CheckboxTable/CheckboxTable.type";
import { PersonTableDataType } from "./PersonTable.type";

export const personColumns: CheckBoxTableColumnType<PersonTableDataType>[] = [
  {
    key: "fullname",
    headerName: "이름",
    render: (value) => <>{!!value ? value : "-"}</>,
  },
  { key: "email", headerName: "이메일" },
  { key: "birthday", headerName: "생일" },
];
