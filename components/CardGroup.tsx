import Card from "../islands/Card.tsx";

export default function CardGroup({
  urlMapping,
}: {
  urlMapping: [string, string[]];
}) {
  const groupName = urlMapping[0];
  const urlList = urlMapping[1];

  return (
    <>
      <div class="flex items-center justify-center p-4 shadow bg-gray-800">
        <h3 class="px-2 text-3xl font-bold text-white bg-blue-500 rounded">
          {groupName}
        </h3>
      </div>
      <div class="flex items-center overflow-x-auto flex-nowrap">
        {urlList.map((url) => <Card fileURL={url} />)}
      </div>
    </>
  );
}
