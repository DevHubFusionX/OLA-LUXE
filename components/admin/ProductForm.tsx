'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema, Product } from '@/lib/schemas';
import { X, Plus, Image as ImageIcon, ExternalLink, Upload, Loader2 } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import apiClient from '@/lib/axios';

interface ProductFormProps {
    initialData?: Product;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export default function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
    const { data: categories } = useCategories();
    const [uploadingIndex, setUploadingIndex] = React.useState<number | null>(null);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [step, setStep] = React.useState(1);

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ProductSchema.omit({ id: true })),
        defaultValues: initialData ? {
            ...initialData,
            images: initialData.images || []
        } : {
            name: '',
            price: 0,
            category: categories?.[0]?.name || '',
            description: '',
            images: [],
            variations: [],
        },
    });

    const watchedImages = watch('images' as any);

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control,
        name: 'images' as any,
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploadingIndex(-1);
        setUploadProgress(0);
        const formData = new FormData();

        Array.from(files).forEach(file => {
            formData.append('images', file);
        });

        try {
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => Math.min(prev + 10, 90));
            }, 200);

            const { data } = await apiClient.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 60000,
            });

            clearInterval(progressInterval);
            setUploadProgress(100);

            const urls = data.data.urls;
            const currentImages = watchedImages.filter((img: string) => img);
            const totalImages = currentImages.length + urls.length;
            
            if (totalImages > 6) {
                alert(`Can only upload ${6 - currentImages.length} more image(s)`);
                setUploadProgress(0);
                setUploadingIndex(null);
                return;
            }

            urls.forEach((url: string) => appendImage(url));
            setTimeout(() => setUploadProgress(0), 1000);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload images. Please try again.');
            setUploadProgress(0);
        } finally {
            setUploadingIndex(null);
        }
    };

    const { fields: variationFields, append: appendVariation, remove: removeVariation } = useFieldArray({
        control,
        name: 'variations' as any,
    });

    const handleFormSubmit = (data: any) => {
        const cleanedData = {
            ...data,
            images: data.images.filter((img: string) => img)
        };
        onSubmit(cleanedData);
    };

    const stepTitles = ['Basic Info', 'Images', 'Variations'];

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center flex-1">
                        <div className="flex flex-col items-center gap-2">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all ${
                                step >= s ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'
                            }`}>
                                {s}
                            </div>
                            <span className={`text-xs font-bold ${
                                step >= s ? 'text-emerald-600' : 'text-slate-400'
                            }`}>{stepTitles[s - 1]}</span>
                        </div>
                        {s < 3 && <div className={`flex-1 h-1 mx-4 transition-all ${
                            step > s ? 'bg-emerald-500' : 'bg-slate-200'
                        }`} />}
                    </div>
                ))}
            </div>

            {/* Upload Progress */}
            {uploadProgress > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-emerald-700">Uploading images...</span>
                        <span className="text-sm font-bold text-emerald-700">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-emerald-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                    </div>
                </div>
            )}

            {/* Step 1: Basic Info */}
            {step === 1 && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            Product Name
                            <span className="text-rose-500">*</span>
                        </label>
                        <input
                            {...register('name')}
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 font-medium focus:border-emerald-500 focus:bg-white transition-all"
                            placeholder="e.g. Minimalist Gold Chain"
                        />
                        {errors.name && <p className="text-rose-500 text-xs font-medium mt-1">{errors.name.message as string}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                Price (₦)
                                <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="number"
                                {...register('price', { valueAsNumber: true })}
                                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 font-medium focus:border-emerald-500 focus:bg-white transition-all"
                                placeholder="0"
                            />
                            {errors.price && <p className="text-rose-500 text-xs font-medium mt-1">{errors.price.message as string}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                Category
                                <span className="text-rose-500">*</span>
                            </label>
                            <select
                                {...register('category')}
                                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 font-medium focus:border-emerald-500 focus:bg-white transition-all"
                            >
                                {categories?.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                                {!categories?.length && <option value="">No categories found</option>}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            Description
                            <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            {...register('description')}
                            rows={8}
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 font-medium focus:border-emerald-500 focus:bg-white transition-all resize-none"
                            placeholder="Describe the product details..."
                        />
                        <p className="text-xs text-slate-500">{watch('description')?.length || 0} characters</p>
                        {errors.description && <p className="text-rose-500 text-xs font-medium mt-1">{errors.description.message as string}</p>}
                    </div>
                </div>
            )}

            {/* Step 2: Images */}
            {step === 2 && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                Product Images
                                <span className="text-rose-500">*</span>
                            </label>
                            <p className="text-xs text-slate-500 mt-1">{imageFields.filter(f => watchedImages?.[imageFields.indexOf(f)]).length}/6 images • Max 3 per upload</p>
                        </div>
                        <label className="cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            {uploadingIndex === -1 ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Upload className="w-4 h-4" />
                            )}
                            Upload Images
                            <input
                                type="file"
                                multiple
                                max="3"
                                className="hidden"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={handleImageUpload}
                                disabled={uploadingIndex !== null || watchedImages.filter((img: string) => img).length >= 6}
                            />
                        </label>
                    </div>

                    {imageFields.filter((_, i) => watchedImages?.[i]).length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {imageFields.map((field, index) => watchedImages?.[index] && (
                                <div key={field.id} className="group relative aspect-square rounded-lg overflow-hidden bg-slate-100 border-2 border-slate-200">
                                    <img src={watchedImages[index]} alt="" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-lg text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center">
                            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-sm text-slate-500">No images uploaded yet</p>
                        </div>
                    )}
                    {errors.images && <p className="text-rose-500 text-xs font-medium">{errors.images.message as string}</p>}
                </div>
            )}

            {/* Step 3: Variations */}
            {step === 3 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="text-sm font-bold text-slate-700">Variations (Optional)</label>
                            <p className="text-xs text-slate-500 mt-1">Add size, color, or other options</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => appendVariation({ type: '', options: [''] })}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-bold shadow-lg"
                        >
                            <Plus className="w-4 h-4" /> Add Variation
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {variationFields.map((field, index) => (
                            <div key={field.id} className="p-6 bg-slate-50 rounded-xl space-y-4 relative group">
                                <button
                                    type="button"
                                    onClick={() => removeVariation(index)}
                                    className="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600">Type</label>
                                    <input
                                        {...register(`variations.${index}.type` as any)}
                                        className="w-full bg-white border-2 border-slate-200 rounded-lg py-3 px-4 font-medium focus:border-emerald-500 transition-all"
                                        placeholder="e.g. Size"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600">Options (comma separated)</label>
                                    <input
                                        value={watch(`variations.${index}.options` as any)?.join(', ') || ''}
                                        onChange={(e) => {
                                            const options = e.target.value.split(',').map(s => s.trim());
                                            setValue(`variations.${index}.options` as any, options);
                                        }}
                                        className="w-full bg-white border-2 border-slate-200 rounded-lg py-3 px-4 font-medium focus:border-emerald-500 transition-all"
                                        placeholder="Small, Medium, Large"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-8 border-t border-slate-100 flex justify-between">
                {step > 1 && (
                    <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-8 py-3 rounded-lg font-bold transition-all"
                    >
                        Back
                    </button>
                )}
                <div className="ml-auto">
                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (step === 1) {
                                    const isValid = await handleSubmit(() => true, () => false)();
                                    if (isValid !== false) setStep(2);
                                } else if (step === 2) {
                                    const images = watchedImages?.filter((img: string) => img) || [];
                                    if (images.length > 0) {
                                        setStep(3);
                                    } else {
                                        alert('Please upload at least one image');
                                    }
                                }
                            }}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-all"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-brand-stone text-white px-12 py-4 rounded-lg font-black shadow-xl shadow-brand-stone/20 hover:bg-brand-accent transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}
