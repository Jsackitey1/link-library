// Array of friendly emojis suitable for avatars
const avatarEmojis = [
  '😊', '😎', '🤓', '🦊', '🐱', '🐶', '🐼', '🐨', '🐯', '🦁',
  '🐮', '🐷', '🐸', '🐙', '🦉', '🦋', '🐢', '🐬', '🐳', '🦄',
  '🌟', '🌈', '🌺', '🌸', '🍀', '🎨', '🎭', '🎪', '🎡', '🎯'
];

export const getRandomEmoji = () => {
  const randomIndex = Math.floor(Math.random() * avatarEmojis.length);
  return avatarEmojis[randomIndex];
};