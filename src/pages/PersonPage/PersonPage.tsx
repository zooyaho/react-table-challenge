import { useGetPersons } from "@/apis/person/personApi.query";
import Checkbox from "@/components/Checkbox";

export default function PersonPage() {
  const { personsData, isPersonsFetchLoading, isPersonsFetchError } =
    useGetPersons({
      _locale: "ko_KR",
      _quantity: 10,
      _gender: "female",
      _birthday_start: "2005-01-01",
    });

  if (isPersonsFetchLoading) return <div>Loading...</div>;
  if (isPersonsFetchError) return <div>목록 불러오기 실패하였습니다.</div>;

  return (
    <div>
      <h1>Person List</h1>
      <Checkbox />
      <ul>
        {personsData?.map((person) => (
          <li key={person.id}>
            <p>{`${person.lastname} ${person.firstname}`}</p>
            <p>Email: {person.email}</p>
            <p>Birthday: {person.birthday}</p>
            <p>City: {person.address.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
