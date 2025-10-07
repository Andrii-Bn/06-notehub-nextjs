'use client';

type Props = {
  error: Error;
};

const NoteError = ({ error }: Props) => {
  return (
    <div style={{ padding: '30px', textAlign: 'center', color: 'red' }}>
      <p>Could not fetch note details. {error.message}</p>
    </div>
  );
};

export default NoteError;
