import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppState, Objective, GOVERNORATES, CLASSIFICATIONS, IndicatorType, Result, Evidence, EmployeeProfile } from './types';
import { calculateTotalWeight, generateId, getDirectorateName, ensureUrlProtocol } from './utils';
import { EvidenceUploader } from './components/EvidenceUploader';
import { VoiceButton } from './components/VoiceButton';
import { 
  Users, Target, ChevronDown, ChevronUp, Plus, Trash, AlertCircle, CheckCircle, 
  Printer, ArrowLeft, ArrowRight, Save, LayoutGrid, FileText, Code, PenTool, Award,
  Sparkles, Loader, AlertTriangle, Quote, Lock
} from 'lucide-react';

// --- Home Page (Redesigned) ---
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center text-center space-y-10 animate-fade-in pb-12 pt-4">
      
      {/* Hero Section */}
      <div className="w-full relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-oman-red to-oman-green rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative w-full bg-white ring-1 ring-gray-900/5 rounded-3xl shadow-2xl overflow-hidden p-8 md:p-12">
           <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-oman-green/10 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-oman-red/10 rounded-full blur-3xl"></div>
           
           <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-800 tracking-tight leading-tight">
             مبادرة <span className="text-transparent bg-clip-text bg-gradient-to-l from-oman-red to-oman-green">توثيق</span>
           </h2>
           <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium">
             المنصة الرقمية الأولى لدعم العاملين بوزارة التربية والتعليم في سلطنة عُمان. 
             <br/>
             <span className="text-oman-green font-bold">وثّق إنجازاتك</span>، <span className="text-oman-red font-bold">حلل أداءك</span>، وأصدر تقارير احترافية بضغطة زر.
           </p>

           <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate('/profile')}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-800 shadow-xl hover:-translate-y-1"
              >
                البدء في التوثيق <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-2 gap-8 w-full">
        <div className="glass-panel p-8 rounded-3xl shadow-lg border-t-8 border-oman-green hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-oman-green">
            <Target size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">الرؤية</h3>
          <p className="text-gray-600 leading-relaxed">
            رؤية تربوية وطنية طموحة تتناغم مع أهداف <span className="font-bold text-oman-green">رؤية عُمان 2040</span>، نسعى من خلالها لتعزيز كفاءة الأداء المؤسسي والفردي.
          </p>
        </div>
        
        <div className="glass-panel p-8 rounded-3xl shadow-lg border-t-8 border-oman-red hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-oman-red">
            <Users size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">الرسالة</h3>
          <p className="text-gray-600 leading-relaxed">
            ترسيخ ثقافة الجودة والشفافية في التوثيق، وتوفير أدوات ذكية تدعم <span className="font-bold text-oman-red">نظام إجادة</span> وتضمن التحسين المستمر.
          </p>
        </div>
      </div>

      {/* Designer Credit Footer */}
      <div className="w-full max-w-md mx-auto mt-16 pt-8 border-t border-gray-200/60">
        <div className="flex flex-col items-center justify-center space-y-2">
           <div className="p-2 bg-white rounded-full shadow-sm">
             <Code size={20} className="text-gray-400" />
           </div>
           <p className="text-gray-500 text-sm font-semibold">تصميم وتطوير</p>
           <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
             أ. مصطفى شعبان
           </h3>
           <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              <span>معلم تقنية المعلومات</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>مدرسة حمزة بن عبدالمطلب</span>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Profile Page (Styled) ---
const ProfilePage = ({ state, updateProfile }: { state: AppState, updateProfile: any }) => {
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateProfile(e.target.name, e.target.value);
  };

  const handleVoiceUpdate = (name: string, val: string) => {
    updateProfile(name, val);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => updateProfile('schoolLogo', reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const renderInput = (label: string, name: keyof EmployeeProfile, placeholder?: string) => (
    <div className="group">
      <label className="block text-sm font-bold text-gray-600 mb-2 transition-colors group-focus-within:text-oman-green">{label}</label>
      <div className="relative">
        <input 
          required 
          type="text" 
          name={name} 
          value={state.profile[name]} 
          onChange={handleChange} 
          className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-base rounded-xl focus:ring-2 focus:ring-oman-green/50 focus:border-oman-green focus:bg-white p-4 pl-12 transition-all duration-200 outline-none shadow-sm"
          placeholder={placeholder} 
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity">
           <VoiceButton onTranscript={(txt) => handleVoiceUpdate(name, txt)} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 animate-fade-in border border-gray-100">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <FileText size={24} />
        </div>
        <h2 className="text-2xl font-black text-gray-800">البيانات الأساسية</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {renderInput('الاسم الثلاثي والقبيلة', 'name', 'مثال: محمد بن سعيد...')}
          {renderInput('المسمى الوظيفي', 'jobTitle')}
          {renderInput('المؤسسة / المدرسة', 'institution')}
          {renderInput('اسم المسؤول المباشر', 'managerName')}
        </div>

        <div className="space-y-6">
          <div className="group">
            <label className="block text-sm font-bold text-gray-600 mb-2 group-focus-within:text-oman-green">المحافظة</label>
            <select name="governorate" value={state.profile.governorate} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-base rounded-xl focus:ring-2 focus:ring-oman-green/50 focus:border-oman-green focus:bg-white p-4 transition-all duration-200 outline-none shadow-sm cursor-pointer">
              <option value="">اختر المحافظة...</option>
              {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            {state.profile.governorate && (
              <p className="text-xs text-oman-green mt-2 font-bold flex items-center gap-1 animate-pulse">
                <CheckCircle size={12} /> {getDirectorateName(state.profile.governorate)}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-sm font-bold text-gray-600 mb-2 group-focus-within:text-oman-green">الفترة</label>
              <select name="period" value={state.profile.period} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-base rounded-xl focus:ring-2 focus:ring-oman-green/50 focus:border-oman-green focus:bg-white p-4 transition-all duration-200 outline-none shadow-sm cursor-pointer">
                <option value="FIRST">الأولى</option>
                <option value="SECOND">الثانية</option>
              </select>
            </div>
            <div className="group">
              <label className="block text-sm font-bold text-gray-600 mb-2 group-focus-within:text-oman-green">العام</label>
              <div className="relative">
                <input type="text" name="year" value={state.profile.year} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-base rounded-xl focus:ring-2 focus:ring-oman-green/50 focus:border-oman-green focus:bg-white p-4 pl-12 transition-all duration-200 outline-none shadow-sm" />
                <VoiceButton onTranscript={(txt) => handleVoiceUpdate('year', txt)} className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50 hover:opacity-100" />
              </div>
            </div>
          </div>
          <div className="group">
            <label className="block text-sm font-bold text-gray-600 mb-2">شعار المدرسة (اختياري)</label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 hover:bg-gray-50 hover:border-oman-green transition-colors text-center cursor-pointer">
               <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
               <div className="pointer-events-none flex flex-col items-center gap-2 text-gray-400">
                  <ArrowUpIcon />
                  <span className="text-xs font-bold">اضغط لرفع الشعار</span>
               </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-end">
        <button onClick={() => navigate('/objectives')} className="bg-gray-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3">
          التالي: الأهداف <ArrowLeft />
        </button>
      </div>
    </div>
  );
};

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

// --- Objectives & Results Manager (Styled) ---
const ObjectivesPage = ({ state, addObjective, updateObjective, deleteObjective, addResult, updateResult, deleteResult }: any) => {
  const [activeObjId, setActiveObjId] = useState<string | null>(null);
  const totalWeight = calculateTotalWeight(state.objectives);
  
  // Validation: Check if ALL objectives have results summing up to their weight
  const allObjectivesValid = state.objectives.length > 0 && state.objectives.every((obj: Objective) => {
      const resultsWeight = calculateTotalWeight(obj.results);
      return resultsWeight === obj.weight;
  });

  const isReportReady = totalWeight === 100 && allObjectivesValid;

  const handleAddObjective = () => {
    if (totalWeight >= 100) return;
    addObjective();
  };

  const validateTargetOrder = (low: string, expected: string, high: string, type: IndicatorType): boolean => {
    if (!low || !expected || !high) return true; // Can't validate empty
    
    if (type === 'DATE') {
        // Oldest Date = High Level (Completed Early/Best)
        // Newest Date = Low Level (Completed Late/Worst)
        return low >= expected && expected >= high;
    }

    const nLow = parseFloat(low);
    const nExpected = parseFloat(expected);
    const nHigh = parseFloat(high);

    if (!isNaN(nLow) && !isNaN(nExpected) && !isNaN(nHigh)) {
        // Numeric Logic: Low < Expected < High
        return nLow <= nExpected && nExpected <= nHigh;
    }
    return true; // Text fallback
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Header Stat */}
      <div className="glass-panel p-5 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center sticky top-20 z-30 transition-all duration-300">
        <div className="mb-4 md:mb-0 text-center md:text-right">
           <h2 className="text-xl font-black text-gray-800 flex items-center justify-center md:justify-start gap-2">
             <Target className="text-oman-red" /> إدارة الأهداف والنتائج
           </h2>
           <p className="text-sm text-gray-500 font-medium mt-1">قم بإضافة الأهداف ثم النتائج الرئيسية لكل هدف.</p>
        </div>
        <div className={`px-6 py-3 rounded-xl font-black text-xl shadow-inner ${totalWeight === 100 ? 'bg-green-100 text-green-700 ring-2 ring-green-200' : 'bg-red-50 text-red-600 ring-2 ring-red-100'}`}>
          الوزن الكلي: {totalWeight}%
        </div>
      </div>

      {state.objectives.map((obj: Objective, index: number) => {
        const resultsWeight = calculateTotalWeight(obj.results);
        const isComplete = resultsWeight === obj.weight && obj.weight > 0;
        
        return (
          <div key={obj.id} className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 ${activeObjId === obj.id ? 'ring-2 ring-oman-green shadow-xl scale-[1.01]' : 'hover:shadow-lg'}`}>
            {/* Objective Header */}
            <div className="p-5 cursor-pointer bg-gradient-to-l from-white to-gray-50" onClick={() => setActiveObjId(activeObjId === obj.id ? null : obj.id)}>
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1 space-y-3 w-full">
                  <div className="flex items-center gap-3">
                    <span className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm">هدف {index + 1}</span>
                    <select 
                      value={obj.classification} 
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateObjective(obj.id, { classification: e.target.value })}
                      className="text-sm border-none bg-blue-100 text-blue-800 rounded-lg px-3 py-1 font-bold focus:ring-0 cursor-pointer hover:bg-blue-200 transition"
                    >
                      {Object.entries(CLASSIFICATIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </div>
                  <div className="relative w-full">
                    <input 
                      type="text" 
                      value={obj.text}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateObjective(obj.id, { text: e.target.value })}
                      placeholder="اكتب نص الهدف هنا..."
                      className="w-full font-bold text-gray-800 text-xl border-b-2 border-dashed border-gray-300 focus:border-oman-green focus:outline-none bg-transparent pb-2 pr-10 transition-colors"
                    />
                    <div className="absolute right-0 top-0 text-gray-400">
                       <PenTool size={20} />
                    </div>
                    <div className="absolute left-0 top-0">
                      <VoiceButton onTranscript={(txt) => updateObjective(obj.id, { text: txt })} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto justify-between md:justify-start mt-2 md:mt-0">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                    <span className="text-sm text-gray-500 font-bold">الوزن:</span>
                    <input 
                      type="number" 
                      value={obj.weight}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateObjective(obj.id, { weight: Number(e.target.value) })}
                      className="w-14 text-center bg-white border rounded p-1 font-bold text-oman-red outline-none focus:ring-1 focus:ring-oman-red text-lg"
                    />
                    <span className="text-sm font-bold text-gray-400">%</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <button onClick={(e) => { e.stopPropagation(); deleteObjective(obj.id); }} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition">
                        <Trash size={20} />
                     </button>
                     <div className="p-2 bg-gray-100 rounded-full">
                        {activeObjId === obj.id ? <ChevronUp size={24} className="text-gray-600"/> : <ChevronDown size={24} className="text-gray-600"/>}
                     </div>
                  </div>
                </div>
              </div>
              
              {!isComplete && (
                <div className="mt-3 text-sm bg-red-50 text-red-600 px-3 py-2 rounded-lg inline-flex items-center gap-2 font-bold animate-pulse mx-5 mb-3">
                  <AlertCircle size={16} />
                  <span>انتبه: مجموع أوزان النتائج ({resultsWeight}%) لا يطابق وزن الهدف ({obj.weight}%)</span>
                </div>
              )}
            </div>

            {/* Results Section (Accordion) */}
            {activeObjId === obj.id && (
              <div className="bg-gray-50/50 p-6 border-t border-gray-100 animate-slide-down">
                <h3 className="text-base font-black text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Code size={18} /> النتائج الرئيسية
                </h3>
                
                {obj.results.map((res: Result, rIndex) => {
                    const isValidTargets = validateTargetOrder(res.targetLow, res.targetExpected, res.targetHigh, res.indicatorType);
                    
                    // Logic for Highlighting
                    const isLowSelected = res.actualPerformance && res.targetLow && res.actualPerformance === res.targetLow;
                    const isExpectedSelected = res.actualPerformance && res.targetExpected && res.actualPerformance === res.targetExpected;
                    const isHighSelected = res.actualPerformance && res.targetHigh && res.actualPerformance === res.targetHigh;
                    
                    const hasTargets = res.targetLow && res.targetExpected && res.targetHigh;

                    return (
                  <div key={res.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 border-b border-gray-100 pb-4 gap-3">
                       <div className="relative flex-1 w-full">
                         <input 
                          className="w-full font-bold text-gray-800 border-none focus:ring-0 text-lg p-0 placeholder-gray-300 bg-transparent"
                          placeholder="اكتب نص النتيجة الرئيسية..."
                          value={res.name}
                          onChange={(e) => updateResult(obj.id, res.id, { name: e.target.value })}
                         />
                         <div className="absolute left-0 top-0">
                           <VoiceButton onTranscript={(txt) => updateResult(obj.id, res.id, { name: txt })} />
                         </div>
                       </div>
                       <div className="flex items-center gap-3 w-full md:w-auto">
                          <div className="flex items-center gap-1 bg-gray-50 px-3 py-2 rounded-lg border">
                             <span className="text-xs text-gray-400 font-bold">وزن النتيجة</span>
                             <input 
                               type="number" 
                               className="w-12 text-base bg-transparent border-none p-0 text-center font-bold text-gray-700 focus:ring-0"
                               placeholder="0"
                               value={res.weight}
                               onChange={(e) => updateResult(obj.id, res.id, { weight: Number(e.target.value) })}
                             />
                          </div>
                          <button onClick={() => deleteResult(obj.id, res.id)} className="text-gray-300 hover:text-red-500 transition"><Trash size={18} /></button>
                       </div>
                    </div>

                    {/* Step 1: Define Type & Targets */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                             <label className="text-sm font-bold text-gray-700">1. تحديد نوع المؤشر والمستهدفات</label>
                             <select 
                               value={res.indicatorType}
                               onChange={(e) => updateResult(obj.id, res.id, { indicatorType: e.target.value })}
                               className="text-xs bg-blue-50 border-blue-100 text-blue-700 rounded-lg p-1 font-bold cursor-pointer"
                              >
                               <option value="NUMBER">عدد</option>
                               <option value="PERCENTAGE">نسبة %</option>
                               <option value="DATE">تاريخ</option>
                             </select>
                        </div>
                        
                        <div className={`bg-gray-50 rounded-xl p-4 border transition-colors ${isValidTargets ? 'border-gray-200' : 'border-red-300 bg-red-50'}`}>
                            {!isValidTargets && <p className="text-red-500 text-xs font-bold mb-2 flex items-center gap-1 text-center justify-center"><AlertTriangle size={12} /> القيم غير منطقية</p>}
                            <div className="grid grid-cols-3 gap-4">
                              <div className={`text-center p-2 rounded-lg transition-all ${isLowSelected ? 'bg-oman-green text-white shadow-lg transform scale-105 ring-2 ring-green-300' : ''}`}>
                                <label className={`text-xs mb-1 block font-bold ${isLowSelected ? 'text-green-100' : 'text-gray-400'}`}>منخفض {res.indicatorType === 'DATE' && '(الأحدث)'}</label>
                                <input 
                                    type={res.indicatorType === 'DATE' ? 'date' : 'number'}
                                    step="any"
                                    className={`w-full text-sm rounded-lg p-2 text-center shadow-sm font-bold ${isLowSelected ? 'bg-white/20 text-white placeholder-white/70 border-white/30' : 'bg-white border-gray-200 text-gray-800'}`} 
                                    placeholder="القيمة" 
                                    value={res.targetLow} 
                                    onChange={(e) => updateResult(obj.id, res.id, { targetLow: e.target.value })} 
                                />
                              </div>
                              <div className={`text-center relative p-2 rounded-lg transition-all ${isExpectedSelected ? 'bg-oman-green text-white shadow-lg transform scale-105 ring-2 ring-green-300' : ''}`}>
                                <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 text-[10px] px-2 rounded-full font-bold ${isExpectedSelected ? 'bg-white text-oman-green' : 'bg-blue-100 text-blue-600'}`}>المتوقع</div>
                                <label className={`text-xs mb-1 block font-bold ${isExpectedSelected ? 'text-green-100' : 'text-blue-400'}`}>المتوقع</label>
                                <input 
                                    type={res.indicatorType === 'DATE' ? 'date' : 'number'} 
                                    step="any"
                                    className={`w-full text-sm rounded-lg p-2 text-center font-bold shadow-sm ${isExpectedSelected ? 'bg-white/20 text-white placeholder-white/70 border-white/30' : 'bg-white border-blue-200 text-blue-900'}`} 
                                    placeholder="القيمة" 
                                    value={res.targetExpected} 
                                    onChange={(e) => updateResult(obj.id, res.id, { targetExpected: e.target.value })} 
                                />
                              </div>
                              <div className={`text-center p-2 rounded-lg transition-all ${isHighSelected ? 'bg-oman-green text-white shadow-lg transform scale-105 ring-2 ring-green-300' : ''}`}>
                                <label className={`text-xs mb-1 block font-bold ${isHighSelected ? 'text-green-100' : 'text-gray-400'}`}>عالي {res.indicatorType === 'DATE' && '(الأقدم)'}</label>
                                <input 
                                    type={res.indicatorType === 'DATE' ? 'date' : 'number'} 
                                    step="any"
                                    className={`w-full text-sm rounded-lg p-2 text-center shadow-sm font-bold ${isHighSelected ? 'bg-white/20 text-white placeholder-white/70 border-white/30' : 'bg-white border-gray-200 text-gray-800'}`} 
                                    placeholder="القيمة" 
                                    value={res.targetHigh} 
                                    onChange={(e) => updateResult(obj.id, res.id, { targetHigh: e.target.value })} 
                                />
                              </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Actual Performance (Dropdown Only) */}
                    <div className="mb-6">
                         <label className="text-sm font-bold text-gray-700 block mb-2 flex items-center gap-2">
                             2. الأداء الفعلي المتحقق
                             {!hasTargets && <span className="text-xs text-red-500 font-normal">(يرجى تعبئة المستهدفات أعلاه أولاً)</span>}
                         </label>
                         <div className="relative">
                            <select 
                                disabled={!hasTargets}
                                value={res.actualPerformance}
                                onChange={(e) => updateResult(obj.id, res.id, { actualPerformance: e.target.value })}
                                className={`w-full text-base border-2 rounded-xl p-3 font-bold appearance-none cursor-pointer transition-all
                                    ${!hasTargets ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white border-oman-green/30 focus:border-oman-green focus:ring-4 focus:ring-oman-green/10 text-gray-900'}
                                `}
                            >
                                <option value="">-- اختر الأداء الذي تم تحقيقه --</option>
                                {res.targetLow && <option value={res.targetLow}>{res.targetLow} (مستوى منخفض)</option>}
                                {res.targetExpected && <option value={res.targetExpected}>{res.targetExpected} (مستوى متوقع)</option>}
                                {res.targetHigh && <option value={res.targetHigh}>{res.targetHigh} (مستوى عالي)</option>}
                            </select>
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                                {hasTargets ? <CheckCircle size={20} className={res.actualPerformance ? "text-oman-green" : "text-gray-300"} /> : <Lock size={18} />}
                            </div>
                         </div>
                    </div>

                    <EvidenceUploader 
                      evidenceList={res.evidence} 
                      onChange={(newEvidence) => updateResult(obj.id, res.id, { evidence: newEvidence })} 
                    />
                  </div>
                )})}

                <button 
                  onClick={() => addResult(obj.id)}
                  disabled={resultsWeight >= obj.weight}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-base font-bold transition-all shadow-md transform hover:scale-[1.01] ${resultsWeight >= obj.weight ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' : 'bg-oman-green text-white hover:bg-green-700 hover:shadow-lg'}`}
                >
                  <Plus size={20} /> إضافة نتيجة جديدة
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* Add Objective Button */}
      <button
        onClick={handleAddObjective}
        disabled={totalWeight >= 100}
        className={`w-full py-5 rounded-2xl shadow-sm border-2 border-dashed flex items-center justify-center gap-2 font-bold text-lg transition-all duration-300 ${totalWeight >= 100 ? 'border-gray-200 text-gray-300 bg-gray-50 cursor-not-allowed opacity-60' : 'border-gray-300 text-gray-500 hover:border-oman-red hover:text-oman-red hover:bg-red-50 hover:shadow-md'}`}
      >
        {totalWeight >= 100 ? (
            <>
                <CheckCircle size={24} className="text-green-500" />
                <span>اكتملت الأهداف (100%)</span>
            </>
        ) : (
            <>
                <Plus size={24} /> 
                <span>إضافة هدف جديد</span>
            </>
        )}
      </button>

      {isReportReady && (
         <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-md px-4">
             <button onClick={() => window.location.hash = '#/report'} className="w-full bg-gray-900 text-white py-4 rounded-2xl shadow-2xl font-bold text-lg hover:bg-gray-800 transition-all flex justify-center items-center gap-3 animate-float hover:scale-105">
               <FileText /> عرض التقرير النهائي
             </button>
         </div>
      )}
    </div>
  );
};

// --- Report Page ---
const ReportPage = ({ state }: { state: AppState }) => {
  const navigate = useNavigate();
 
  // Validation Logic
  const totalObjectivesWeight = calculateTotalWeight(state.objectives);
  const allResultsValid = state.objectives.length > 0 && state.objectives.every((obj: Objective) => {
      const resultsWeight = calculateTotalWeight(obj.results);
      return resultsWeight === obj.weight;
  });

  if (totalObjectivesWeight !== 100 || !allResultsValid) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in text-center px-4">
        <div className="bg-red-50 p-6 rounded-full mb-6 text-oman-red">
           <AlertCircle size={64} />
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">التقرير غير جاهز</h2>
        <p className="text-gray-500 font-medium max-w-lg">
          لا يمكن عرض التقرير. يرجى التأكد من أن:
          <br/>
          1. مجموع أوزان الأهداف يساوي <span className="font-bold text-red-600">100%</span>.
          <br/>
          2. مجموع أوزان النتائج لكل هدف يساوي <span className="font-bold text-red-600">وزن الهدف</span>.
        </p>
        <button onClick={() => window.location.hash = '#/objectives'} className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition flex items-center gap-2">
            <ArrowRight size={20} /> العودة للأهداف وتصحيح الأوزان
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    const reportContent = document.querySelector('.report-container');
    if (!reportContent) {
      alert("لا يوجد محتوى للطباعة");
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("تم حظر النافذة المنبثقة. يرجى السماح للموقع بفتح نوافذ منبثقة للطباعة.");
      return;
    }

    // Inject Tailwind Config to ensure colors work in new window
    const tailwindConfig = `
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              oman: {
                red: '#C8102E',
                green: '#008546',
                white: '#FFFFFF',
                silver: '#A5A5A5',
                text: '#2D3748',
                bg: '#F3F4F6'
              }
            },
            fontFamily: {
              sans: ['Cairo', 'sans-serif'],
            }
          }
        }
      }
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8" />
          <title></title>
          <script src="https://cdn.tailwindcss.com"></script>
          <script>${tailwindConfig}</script>
          <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Cairo', sans-serif; background: white; margin: 0; padding: 0; }
            .grid { display: grid; }
            @media print {
               @page { size: A4; margin: 5mm; }
               body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-size: 10pt; }
               .no-print { display: none; }
               .print-break-inside-avoid { break-inside: avoid; }
               h1 { font-size: 16pt !important; }
               h2 { font-size: 13pt !important; }
               .text-xs { font-size: 8pt !important; }
               
               /* Omani Heritage Decorative Border - Clean White Background */
               .heritage-border {
                  border: 4px double #C8102E;
                  position: relative;
                  padding: 10px;
                  background: white; /* Removed grid background */
               }
               .heritage-border::before {
                  content: '';
                  position: absolute;
                  top: 0; left: 0; right: 0; height: 5px;
                  background: linear-gradient(to right, #008546, #FFFFFF, #C8102E);
               }
               .heritage-border::after {
                  content: '';
                  position: absolute;
                  bottom: 0; left: 0; right: 0; height: 5px;
                  background: linear-gradient(to right, #C8102E, #FFFFFF, #008546);
               }
            }
          </style>
        </head>
        <body>
          <div class="max-w-4xl mx-auto heritage-border">
            ${reportContent.innerHTML}
          </div>
          <script>
            // Wait for resources then print
            window.onload = () => {
               setTimeout(() => {
                 window.print();
                 // Optional: window.close(); 
               }, 800);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="bg-white mx-auto print:w-full print:max-w-none print:p-0 animate-fade-in">
       
       {/* Print Controls */}
       <div className="no-print flex justify-between items-center bg-gray-900 text-white p-5 rounded-2xl mb-8 shadow-2xl sticky top-24 z-50 ring-1 ring-white/20">
         <div className="flex items-center gap-4">
            <button 
                onClick={() => navigate('/objectives')}
                className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition text-white flex items-center gap-2"
                title="العودة للأهداف"
            >
                <ArrowRight size={20} />
                <span className="font-bold text-sm">العودة للأهداف</span>
            </button>
            <div>
                <h3 className="font-bold text-lg">معاينة التقرير</h3>
                <p className="text-xs text-gray-400 font-medium">جاهز للطباعة بحجم A4</p>
            </div>
         </div>
         <div className="flex gap-3">
            <button 
               type="button"
               onClick={handlePrint} 
               className="bg-oman-green hover:bg-green-600 px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition shadow-lg text-sm"
            >
               <Printer size={18} /> طباعة / حفظ PDF
            </button>
         </div>
       </div>

       {/* REPORT CONTENT - A4 Optimized */}
       <div className="report-container font-sans text-gray-900 leading-snug">
          
          {/* Report Header */}
          <div className="border-b-2 border-oman-green pb-4 mb-6 print:mb-2 print:pb-2 flex justify-between items-end bg-gray-50 print:bg-transparent p-4 print:p-0 rounded-lg">
            <div>
              <h1 className="text-3xl font-black text-oman-red mb-1 print:text-xl print:mb-0">توثيق أدلة إجادة</h1>
              <p className="text-lg font-bold text-gray-800 mb-2 print:text-sm print:font-bold print:mb-0">{state.profile.name}</p>

              <h2 className="text-xl font-bold text-oman-green print:text-base print:mt-1">نظام إجادة</h2>
              <p className="text-base text-gray-600 font-medium mt-1 print:text-xs">{state.profile.year} - الفترة {state.profile.period === 'FIRST' ? 'الأولى' : 'الثانية'}</p>
            </div>
            <div className="flex gap-4">
               {state.profile.schoolLogo && <img src={state.profile.schoolLogo} alt="School Logo" className="h-24 w-24 print:h-20 print:w-20 object-contain" />}
               <div className="text-left text-sm text-gray-600 font-medium print:text-xs">
                  <p className="font-bold text-black text-lg print:text-sm">سلطنة عُمان</p>
                  <p>وزارة التربية والتعليم</p>
                  <p>{getDirectorateName(state.profile.governorate)}</p>
               </div>
            </div>
          </div>

          {/* Basic Info Grid */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 print:p-2 print:mb-3 print:bg-white print:border-double print:border-4 print:border-gray-300">
            <h3 className="text-base font-black text-oman-red mb-4 uppercase tracking-wider border-b border-gray-200 pb-2 inline-block print:mb-1 print:text-xs print:pb-0">البيانات الأساسية</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-base print:text-xs print:gap-2">
               <div><span className="text-gray-500 block text-xs mb-1 font-bold print:mb-0">الاسم:</span> <span className="font-bold text-lg text-gray-900 print:text-sm">{state.profile.name}</span></div>
               <div><span className="text-gray-500 block text-xs mb-1 font-bold print:mb-0">الوظيفة:</span> <span className="font-bold text-lg text-gray-900 print:text-sm">{state.profile.jobTitle}</span></div>
               <div><span className="text-gray-500 block text-xs mb-1 font-bold print:mb-0">جهة العمل:</span> <span className="font-bold text-lg text-gray-900 print:text-sm">{state.profile.institution}</span></div>
               <div><span className="text-gray-500 block text-xs mb-1 font-bold print:mb-0">المسؤول المباشر:</span> <span className="font-bold text-lg text-gray-900 print:text-sm">{state.profile.managerName}</span></div>
            </div>
          </div>

          {/* Objectives Table */}
          <div className="space-y-8 print:space-y-3">
            {state.objectives.map((obj, i) => (
              <div key={obj.id} className="border-2 border-oman-green/50 rounded-lg overflow-hidden print:border print:border-gray-400 print:rounded-none">
                 {/* Objective Header */}
                 <div className="bg-gray-100 p-3 border-b-2 border-oman-green/50 flex justify-between items-center print:bg-oman-green print:text-white print:py-1 print:px-2 print-break-inside-avoid print:border-b-0">
                    <span className="font-black text-lg text-gray-900 print:text-white print:text-xs">الهدف {i + 1}: {obj.text}</span>
                    <span className="bg-white border border-gray-400 px-3 py-1 rounded text-sm font-bold print:text-black print:text-[10px] print:px-1 print:py-0">{CLASSIFICATIONS[obj.classification]} ({obj.weight}%)</span>
                 </div>
                 
                 {/* Results Header */}
                 <div className="grid grid-cols-12 bg-gray-50 text-sm font-black p-3 border-b border-gray-300 text-gray-700 print:text-black print:text-[10px] print:py-1 print:bg-gray-200 print-break-inside-avoid">
                    <div className="col-span-3">النتيجة</div>
                    <div className="col-span-1 text-center">الوزن</div>
                    <div className="col-span-3 text-center">المستهدفات</div>
                    <div className="col-span-2 text-center">الأداء الفعلي</div>
                    <div className="col-span-3">الأدلة</div>
                 </div>

                 {obj.results.map((res) => {
                   // Calculate Highlighting for Actual Performance
                   const cleanActual = res.actualPerformance?.trim();
                   const isLow = cleanActual && cleanActual === res.targetLow?.trim();
                   const isExpected = cleanActual && cleanActual === res.targetExpected?.trim();
                   const isHigh = cleanActual && cleanActual === res.targetHigh?.trim();

                   return (
                   <div key={res.id} className="grid grid-cols-12 text-sm border-b last:border-0 border-gray-300 p-3 items-start print:text-[10px] print:py-1 print-break-inside-avoid">
                      <div className="col-span-3 font-bold pl-2 text-gray-900">{res.name}</div>
                      <div className="col-span-1 text-center font-medium">{res.weight}%</div>
                      <div className="col-span-3 flex flex-col gap-1 text-xs print:text-[9px] px-1">
                         <div className={`flex justify-between border-b border-gray-100 pb-0.5 px-1 rounded-sm ${isLow ? 'bg-gray-200 font-bold text-black print:bg-gray-400 print:text-black' : 'text-gray-500'}`}>
                            <span>منخفض:</span>
                            <span>{res.targetLow}</span>
                         </div>
                         <div className={`flex justify-between border-b border-gray-100 pb-0.5 px-1 rounded-sm ${isExpected ? 'bg-gray-200 font-bold text-black print:bg-gray-400 print:text-black' : 'text-gray-500'}`}>
                            <span>متوقع:</span>
                            <span>{res.targetExpected}</span>
                         </div>
                         <div className={`flex justify-between px-1 rounded-sm ${isHigh ? 'bg-gray-200 font-bold text-black print:bg-gray-400 print:text-black' : 'text-gray-500'}`}>
                            <span>عالي:</span>
                            <span>{res.targetHigh}</span>
                         </div>
                      </div>
                      <div className="col-span-2 text-center font-black text-lg text-gray-900 print:text-xs">{res.actualPerformance}</div>
                      
                      {/* Evidence Column - Horizontal Layout */}
                      <div className="col-span-3">
                         {res.evidence.length > 0 ? (
                            <div className="flex flex-row flex-wrap gap-2 items-start content-start print:gap-1">
                               {res.evidence.map(ev => {
                                 // Render Text Evidence
                                 if (ev.type === 'TEXT') {
                                    return (
                                        <div key={ev.id} className="min-w-[50px] max-w-full bg-gray-50 p-1.5 rounded text-[10px] border border-gray-200 print:text-[9px] print:p-1 print:bg-white print:border-gray-400 text-justify leading-tight shadow-sm flex-grow">
                                            <p className="text-gray-900 whitespace-pre-wrap">
                                                {ev.content}
                                            </p>
                                        </div>
                                    );
                                 }

                                 // Render Image Evidence
                                 if (ev.type === 'IMAGE') return (
                                   <div key={ev.id} className="border border-gray-200 p-0.5 bg-white rounded overflow-hidden print:border-0 inline-block shadow-sm">
                                     <img src={ev.content} className="h-16 w-auto print:h-14 object-contain rounded-sm" alt="Evidence" />
                                   </div>
                                 );

                                 // Render Link/Video Evidence
                                 if (ev.type === 'LINK' || ev.type === 'VIDEO') {
                                   const safeUrl = ensureUrlProtocol(ev.content);
                                   return (
                                     <div key={ev.id} className="flex flex-col items-center gap-1 border p-1 rounded bg-white border-gray-200 print:border-gray-400 max-w-[80px]">
                                         <img 
                                           src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(safeUrl)}`} 
                                           className="w-10 h-10 print:w-12 print:h-12 object-contain" 
                                           alt="QR Code" 
                                         />
                                         <a href={safeUrl} target="_blank" rel="noreferrer" className="text-[8px] print:text-[8px] text-blue-700 font-bold underline truncate w-full text-center">
                                            رابط
                                         </a>
                                     </div>
                                   );
                                 }
                                 
                                 return null;
                               })}
                            </div>
                         ) : <span className="text-gray-400 italic text-xs">لا يوجد</span>}
                      </div>
                   </div>
                 )})}
              </div>
            ))}
          </div>

          {/* Combined Section for Signatures to prevent page break */}
          <div className="print-break-inside-avoid mt-8 print:mt-4">
             {/* Footer Signatures - NO ANALYSIS */}
             <div className="flex justify-between px-10 pt-10 border-t-4 border-double border-oman-red text-base print:mt-2 print:pt-4 print:text-xs print:px-4">
                <div className="text-center">
                   <p className="font-bold mb-12 text-black print:mb-6">الموظف</p>
                   <p className="text-gray-400">..................</p>
                </div>
                <div className="text-center">
                   <p className="font-bold mb-12 text-black print:mb-6">المسؤول المباشر</p>
                   <p className="text-gray-400">..................</p>
                </div>
                <div className="text-center">
                   <p className="font-bold mb-12 text-black print:mb-6">الاعتماد</p>
                   <p className="text-gray-400">..................</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};


// --- Main App Component ---
export default function App() {
  const [state, setState] = useState<AppState>(() => {
    // Try load from local storage
    const saved = localStorage.getItem('tawthiq_state');
    return saved ? JSON.parse(saved) : {
      profile: {
        name: '', jobTitle: '', institution: '', managerName: '', governorate: '', period: 'FIRST', year: '2025'
      },
      objectives: []
    };
  });

  useEffect(() => {
    localStorage.setItem('tawthiq_state', JSON.stringify(state));
  }, [state]);

  const updateProfile = (key: keyof EmployeeProfile, value: any) => {
    setState(prev => ({ ...prev, profile: { ...prev.profile, [key]: value } }));
  };

  const addObjective = () => {
    const newObjective: Objective = {
      id: generateId(),
      text: '',
      classification: 'TASKS',
      weight: 0,
      results: []
    };
    setState(prev => ({ ...prev, objectives: [...prev.objectives, newObjective] }));
  };

  const updateObjective = (id: string, data: Partial<Objective>) => {
    setState(prev => ({
      ...prev,
      objectives: prev.objectives.map(o => o.id === id ? { ...o, ...data } : o)
    }));
  };

  const deleteObjective = (id: string) => {
    setState(prev => ({ ...prev, objectives: prev.objectives.filter(o => o.id !== id) }));
  };

  const addResult = (objId: string) => {
    const newResult: Result = {
      id: generateId(),
      name: '',
      weight: 0,
      indicatorType: 'NUMBER',
      targetLow: '',
      targetExpected: '',
      targetHigh: '',
      actualPerformance: '',
      evidence: []
    };
    setState(prev => ({
      ...prev,
      objectives: prev.objectives.map(o => o.id === objId ? { ...o, results: [...o.results, newResult] } : o)
    }));
  };

  const updateResult = (objId: string, resId: string, data: Partial<Result>) => {
    setState(prev => ({
      ...prev,
      objectives: prev.objectives.map(o => o.id === objId ? {
        ...o,
        results: o.results.map(r => r.id === resId ? { ...r, ...data } : r)
      } : o)
    }));
  };

  const deleteResult = (objId: string, resId: string) => {
    setState(prev => ({
      ...prev,
      objectives: prev.objectives.map(o => o.id === objId ? {
        ...o,
        results: o.results.filter(r => r.id !== resId)
      } : o)
    }));
  };

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage state={state} updateProfile={updateProfile} />} />
          <Route path="/objectives" element={
            <ObjectivesPage 
              state={state} 
              addObjective={addObjective}
              updateObjective={updateObjective}
              deleteObjective={deleteObjective}
              addResult={addResult}
              updateResult={updateResult}
              deleteResult={deleteResult}
            />
          } />
          <Route path="/report" element={<ReportPage state={state} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}