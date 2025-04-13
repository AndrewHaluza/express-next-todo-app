export function NotFound(props: { message: string }) {
  return (
    <div className="flex items-center">
      <p>{props.message}</p>
    </div>
  );
}
