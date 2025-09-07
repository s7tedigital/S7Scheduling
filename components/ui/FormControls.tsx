import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, id, error, ...props }, ref) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
      {label}
    </label>
    <input
      id={id}
      ref={ref}
      className={`block w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border ${error ? 'border-error' : 'border-slate-300 dark:border-slate-700'} rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-error">{error}</p>}
  </div>
));

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, id, error, ...props }, ref) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      ref={ref}
      rows={3}
      className={`block w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border ${error ? 'border-error' : 'border-slate-300 dark:border-slate-700'} rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-error">{error}</p>}
  </div>
));

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, id, error, children, ...props }, ref) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        {label}
      </label>
      <select
        id={id}
        ref={ref}
        className={`block w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border ${error ? 'border-error' : 'border-slate-300 dark:border-slate-700'} rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  ));
