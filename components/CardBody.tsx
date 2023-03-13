import CardInfo from "./CardInfo.tsx";

const analyticsItems = [
  {
    label: "UTAG",
    color: "blue",
    version: "utagVersion",
  },
  {
    label: "VTG",
    color: "indigo",
    version: "vtgVersion",
  },
  {
    label: "Conviva",
    color: "pink",
    version: "convivaVersion",
  },
];

type CardBodyProps = {
  versions?: { [key: string]: string };
  isError: boolean;
  isLoading: boolean;
};

export default function CardBody(
  { versions, isError, isLoading }: CardBodyProps,
) {
  return (
    <>
      {analyticsItems.map((item) => {
        return (
          <div class="flex items-center justify-between p-2">
            <span
              class={`bg-${item.color}-900 text-${item.color}-200 text-base font-medium mr-2 px-2.5 py-0.5 rounded -rotate-12`}
            >
              {item.label}
            </span>
            <CardInfo
              text={versions?.[item.version]}
              isError={isError}
              isLoading={isLoading}
            />
          </div>
        );
      })}
    </>
  );
}
