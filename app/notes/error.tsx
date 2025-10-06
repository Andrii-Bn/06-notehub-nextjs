'use client';

type Props = {
  error: Error | null;
};

const NoteError = ({ error }: Props) => {
  if (!error) return null;

  return (
    <div style={{ padding: '30px', textAlign: 'center', color: 'red' }}>
      <p>Something went wrong {error.message}</p>
    </div>
  );
};

export default NoteError;
