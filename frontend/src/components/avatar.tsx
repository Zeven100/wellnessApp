export function Avatar({ authorName, size }: { authorName: string; size: "6" | "9" }) {
  const avatarStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: '#f3f4f6', // Tailwind bg-gray-100
      borderRadius: '9999px', // Rounded-full
      darkBackgroundColor: '#4b5563', // Tailwind dark:bg-gray-600
  };

  const textStyle = {
      fontWeight: '500', // Tailwind font-medium
      color: '#9ca3af', // Tailwind text-gray-600
      darkColor: '#d1d5db', // Tailwind dark:text-gray-300
  };

  const sizeStyle = size === "6" ? { width: '1.5rem', height: '1.5rem' } : { width: '2.25rem', height: '2.25rem' }; // Tailwind w-6 h-6 and w-9 h-9

  return (
      <div style={{ ...avatarStyle, ...sizeStyle }}>
          <span style={{ ...textStyle }}>{authorName[0]}</span>
      </div>
  );
}
