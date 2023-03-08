import { useEffect, useState } from "preact/hooks";
import Error from "../components/Error.tsx";
import CardHeader from "../components/CardHeader.tsx";
import CardBody from "../components/CardBody.tsx";

export default function Card({ fileURL }: { fileURL: string }) {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [versions, setVersions] = useState();

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const rawResponse = await fetch(fileURL);
        if (!rawResponse.ok) {
          throw Error();
        }
        const response = await rawResponse.json();

        setVersions(response);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, []);

  return (
    <div class="block max-w-sm p-6 m-2 border border-gray-800 bg-gray-800 rounded-lg shadow-md">
      <CardHeader fileURL={fileURL} />
      <hr class="h-px my-8 bg-gray-700 border-0" />
      <div class="flex flex-col text-lg">
        <CardBody
          versions={versions}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
