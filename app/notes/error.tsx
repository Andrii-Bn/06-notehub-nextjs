'use client';

type Props = {
  error: Error | null;
};

const NoteError = ({ error }: Props) => {
  if (!error) return null; // Or display a default message

  return (
    <div style={{ padding: '30px', textAlign: 'center', color: 'red' }}>
      <p>Could not fetch note details. {error.message}</p>
    </div>
  );
};

export default NoteError;
