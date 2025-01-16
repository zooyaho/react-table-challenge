import PersonTable from "@/components/person/PersonTable";
import PersonTableHeader from "@/components/person/PersonTableHeader";

export default function PersonPage() {
  return (
    <main className="flex justify-center  min-h-screen">
      <div className="w-[80%] mt-9">
        <PersonTableHeader />
        <PersonTable />
      </div>
    </main>
  );
}
