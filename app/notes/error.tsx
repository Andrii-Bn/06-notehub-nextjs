'use client';

type Props = {
  error: Error;
};

const NoteError = ({ error }: Props) => {
  return (
    <div style={{ padding: '30px', textAlign: 'center', color: 'red' }}>
      <p>Something went wrong {error.message}</p>
    </div>
  );
};

export default NoteError;
