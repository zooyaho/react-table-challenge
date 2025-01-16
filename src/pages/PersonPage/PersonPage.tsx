import PersonTable from "@/components/person/PersonTable";

export default function PersonPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[80%]">
        <h1 className="text-center mb-4">Person List</h1>
        <PersonTable />
      </div>
    </div>
  );
}
