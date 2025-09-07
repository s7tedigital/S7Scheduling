import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Scene, SceneStatus } from '../../types';
import Button from '../ui/Button';
import { Input, Textarea, Select } from '../ui/FormControls';

export type SceneFormData = Omit<Scene, 'id' | 'projectId' | 'equipment'> & { equipment: string };

interface SceneFormProps {
  onSubmit: SubmitHandler<SceneFormData>;
  onCancel: () => void;
  initialData?: Scene;
}

const SceneForm: React.FC<SceneFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SceneFormData>({
    defaultValues: initialData ? {
      ...initialData,
      scheduledDate: initialData.scheduledDate ? initialData.scheduledDate.split('T')[0] : null,
      equipment: initialData.equipment.join(', '), // Convert array to string
    } : {
      sceneNumber: '',
      description: '',
      location: '',
      scheduledDate: null,
      durationMinutes: 60,
      equipment: '',
      status: SceneStatus.Scheduled,
    }
  });

  const handleFormSubmit: SubmitHandler<SceneFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        id="sceneNumber"
        label="Scene Number"
        {...register('sceneNumber', { required: 'Scene number is required' })}
        error={errors.sceneNumber?.message}
      />
      <Textarea
        id="description"
        label="Description"
        {...register('description')}
        error={errors.description?.message}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
            id="location"
            label="Location"
            {...register('location', { required: 'Location is required' })}
            error={errors.location?.message}
        />
        <Input
            id="durationMinutes"
            label="Duration (minutes)"
            type="number"
            {...register('durationMinutes', { 
                required: 'Duration is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Duration must be at least 1 minute' }
            })}
            error={errors.durationMinutes?.message}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="scheduledDate"
          label="Scheduled Date"
          type="date"
          {...register('scheduledDate')}
          error={errors.scheduledDate?.message}
        />
        <Select
          id="status"
          label="Status"
          {...register('status', { required: true })}
          error={errors.status?.message}
        >
          {Object.values(SceneStatus).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </Select>
      </div>
      <Textarea
        id="equipment"
        label="Equipment (comma-separated)"
        {...register('equipment')}
        error={errors.equipment?.message}
      />
      <div className="flex justify-end gap-4 pt-4 mt-2 border-t border-slate-200 dark:border-slate-800">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? 'Update Scene' : 'Create Scene'}
        </Button>
      </div>
    </form>
  );
};

export default SceneForm;