interface ErrorState {
  errors?: {
    [key: string]: string | string[];
  };
  server_validation_error?: string;
  server_error?: string;
}

interface FormErrorProps {
  state?: ErrorState;
  className?: string;
}

export function FormError({ state, className = "" }: FormErrorProps) {
  if (!state) return null;

  const error = state.server_validation_error || state.server_error;
  if (!error) return null;

  return <p className={`text-sm text-red-500 ${className}`}>{error}</p>;
}

interface FieldErrorProps {
  state?: ErrorState;
  field: string;
  className?: string;
}

export function FieldError({ state, field, className = "" }: FieldErrorProps) {
  if (!state?.errors) return null;

  const error = state.errors[field];
  if (!error) return null;

  if (Array.isArray(error)) {
    return (
      <div className={`text-sm text-red-500 ${className}`}>
        <ul className="list-disc ml-4">
          {error.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <p className={`text-sm text-red-500 ${className}`}>{error}</p>;
}
