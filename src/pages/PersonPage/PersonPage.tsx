import { useGetPersons } from "@/apis/person/personApi.query";

export default function PersonPage() {
  const { personsData, isPersonsFetchLoading, isPersonsFetchError } =
    useGetPersons({
      _quantity: 5,
      _gender: "female",
      _birthday_start: "2005-01-01",
    });

  if (isPersonsFetchLoading) return <div>Loading...</div>;
  if (isPersonsFetchError) return <div>목록 불러오기 실패하였습니다.</div>;

  return (
    <div>
      <h1>Person List</h1>
      <ul>
        {personsData?.map((person) => (
          <li key={person.id}>
            <p>{`${person.firstname} ${person.lastname}`}</p>
            <p>Email: {person.email}</p>
            <p>Birthday: {person.birthday}</p>
            <p>City: {person.address.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
