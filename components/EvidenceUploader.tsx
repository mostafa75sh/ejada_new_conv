import React, { useState, useRef } from 'react';
import { Evidence, EvidenceType } from '../types';
import { generateId } from '../utils';
import { Image, Link, FileText, Trash2, Mic, StopCircle, PenTool, X } from 'lucide-react';

interface Props {
  evidenceList: Evidence[];
  onChange: (list: Evidence[]) => void;
}

export const EvidenceUploader: React.FC<Props> = ({ evidenceList, onChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [inputText, setInputText] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to read file as DataURL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: EvidenceType) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newEvidence: Evidence = {
          id: generateId(),
          type,
          content: reader.result as string,
          notes: file.name
        };
        onChange([...evidenceList, newEvidence]);
      };
      reader.readAsDataURL(file);
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addLink = () => {
    if (!linkInput) return;
    const newEvidence: Evidence = {
      id: generateId(),
      type: 'LINK',
      content: linkInput
    };
    onChange([...evidenceList, newEvidence]);
    setLinkInput('');
  };

  const addText = () => {
    if (!inputText.trim()) return;
    const newEvidence: Evidence = {
      id: generateId(),
      type: 'TEXT',
      content: inputText
    };
    onChange([...evidenceList, newEvidence]);
    setInputText('');
    setShowTextInput(false);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("متصفحك لا يدعم الإدخال الصوتي");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    setShowTextInput(true); // Open text area to show result
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-OM';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(prev => prev + (prev ? ' ' : '') + transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const removeEvidence = (id: string) => {
    onChange(evidenceList.filter(e => e.id !== id));
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h4 className="text-sm font-bold text-gray-700 mb-3">إرفاق الأدلة والبراهين</h4>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Image Button */}
        <label className="cursor-pointer bg-white border border-gray-300 text-gray-600 px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm transition-all hover:border-oman-green">
          <Image size={16} /> صورة
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e, 'IMAGE')} 
          />
        </label>

        {/* Text/Note Button */}
        <button 
          onClick={() => setShowTextInput(!showTextInput)}
          className={`px-3 py-2 rounded-md flex items-center gap-2 text-sm transition-all ${showTextInput ? 'bg-blue-50 border-blue-200 text-blue-600 ring-1 ring-blue-300' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-blue-400'}`}
        >
          <PenTool size={16} /> كتابة نص
        </button>
        
        {/* Voice Button */}
        <button 
          onClick={handleVoiceInput}
          className={`px-3 py-2 rounded-md flex items-center gap-2 text-sm transition-colors ${isRecording ? 'bg-red-100 text-red-600 animate-pulse border border-red-200' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
        >
          {isRecording ? <StopCircle size={16} /> : <Mic size={16} />}
          {isRecording ? 'جارٍ التسجيل...' : 'إملاء صوتي'}
        </button>
      </div>

      {/* Text Input Area */}
      {showTextInput && (
        <div className="mb-4 bg-white p-3 rounded-lg border border-blue-100 shadow-sm animate-fade-in">
          <div className="flex justify-between items-center mb-2">
             <label className="text-xs font-bold text-blue-600">نص الدليل / الملاحظة</label>
             <button onClick={() => setShowTextInput(false)} className="text-gray-400 hover:text-red-500"><X size={14}/></button>
          </div>
          <textarea
            className="w-full p-3 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none min-h-[80px]"
            placeholder="اكتب تفاصيل الدليل هنا..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button 
              onClick={addText}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-bold hover:bg-blue-700"
            >
              حفظ النص
            </button>
          </div>
        </div>
      )}

      {/* Link Input */}
      <div className="flex gap-2 mb-4">
        <input 
          type="url" 
          placeholder="إضافة رابط (فيديو/مستند/ملف سحابي)..." 
          className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-oman-green focus:outline-none"
          value={linkInput}
          onChange={(e) => setLinkInput(e.target.value)}
        />
        <button 
          onClick={addLink}
          className="bg-oman-green text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
        >
          <Link size={16} />
        </button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {evidenceList.map(ev => (
          <div key={ev.id} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200 shadow-sm text-sm group hover:border-gray-300 transition-colors">
            <div className="flex items-center gap-3 overflow-hidden flex-1">
              <div className="flex-shrink-0">
                {ev.type === 'IMAGE' && <Image size={18} className="text-purple-500" />}
                {ev.type === 'LINK' && <Link size={18} className="text-green-500" />}
                {ev.type === 'TEXT' && <FileText size={18} className="text-blue-500" />}
              </div>
              
              <div className="flex-1 min-w-0 flex items-center gap-2">
                 <span className="truncate text-gray-700 font-medium block">
                    {ev.type === 'IMAGE' ? 'صورة مرفقة' : ev.content}
                 </span>
                 {ev.type === 'IMAGE' && (
                    <img src={ev.content} alt="preview" className="h-8 w-8 object-cover rounded border border-gray-100" />
                 )}
              </div>
            </div>
            <button onClick={() => removeEvidence(ev.id)} className="text-gray-400 hover:text-red-500 p-1">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {evidenceList.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-2 bg-gray-50/50 rounded border border-dashed border-gray-200">لا توجد أدلة مرفقة حتى الآن</p>
        )}
      </div>
    </div>
  );
};