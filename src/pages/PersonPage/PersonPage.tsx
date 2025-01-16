import { SearchInput } from "@/components/common/input";
import PersonTable from "@/components/person/PersonTable";

export default function PersonPage() {
  return (
    <main className="flex justify-center  min-h-screen">
      <div className="w-[80%] mt-9">
        <div className="w-full flex justify-between items-center mb-5">
          <h1 className="text-center font-semibold text-xl text-blue-700">
            Person List
          </h1>
          <SearchInput className="w-[30%]" placeholder="검색" />
        </div>
        <PersonTable />
      </div>
    </main>
  );
}
