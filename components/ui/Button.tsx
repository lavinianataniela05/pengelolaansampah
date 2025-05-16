// components/ui/Button.tsx
type ButtonProps = {
    label: string
    onClick: () => void
  }
  
  const Button = ({ label, onClick }: ButtonProps) => {
    return (
      <button
        onClick={onClick}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {label}
      </button>
    )
  }
  
  export default Button
  