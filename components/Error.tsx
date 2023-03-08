export default function Error() {
  return (
    <span class="inline-flex items-center w-48 bg-red-900 text-red-300 text-base font-medium px-2.5 py-0.5 rounded-full hover:bg-red-800">
      <span class="relative flex h-2 w-2  mr-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75">
        </span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500">
        </span>
      </span>{" "}
      Error
    </span>
  );
}
