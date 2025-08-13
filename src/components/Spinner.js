export default function Spinner() {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}
