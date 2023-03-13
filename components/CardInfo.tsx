import Error from "./Error.tsx";
import Loading from "./Loading.tsx";
import VersionText from "./VersionText.tsx";

type cardInfoProps = {
  text?: string;
  isError: boolean;
  isLoading: boolean;
};

export default function CardInfo(
  { text, isError, isLoading }: cardInfoProps,
) {
  if (isLoading) {
    return <Loading />;
  } else if (isError || !text) {
    return <Error />;
  } else {
    return <VersionText text={text} />;
  }
}
