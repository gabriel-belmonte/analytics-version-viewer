import Error from "./Error.tsx";
import Loading from "./Loading.tsx";
import VersionText from "./VersionText.tsx";

export default function CardInfo(
  { text, isError, isLoading }: {
    text?: string;
    isError: boolean;
    isLoading: boolean;
  },
) {
  if (isLoading) {
    return <Loading />;
  } else if (isError || !text) {
    return <Error />;
  } else {
    return <VersionText text={text} />;
  }
}
