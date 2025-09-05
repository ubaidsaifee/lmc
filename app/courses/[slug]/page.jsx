import { getCourseBySlug } from '@/app/lib/courses';
import { notFound } from 'next/navigation';
import { 
  Clock, 
  Award, 
  BookOpen, 
  CheckCircle, 
  Users, 
  Target, 
  Video, 
  FileText, 
  MessageSquare, 
  GraduationCap,
  KeyRound,
  Lightbulb
} from 'lucide-react';
import CourseEnrollButton from './CourseEnrollButton';

// NEW: Helper function to dynamically select an icon
const getIconForItem = (itemText) => {
    const text = itemText.toLowerCase();
    const iconProps = { size: 16, className: "text-blue-500 flex-shrink-0" };

    if (text.includes('video')) return <Video {...iconProps} />;
    if (text.includes('pdf') || text.includes('guide')) return <FileText {...iconProps} />;
    if (text.includes('support')) return <MessageSquare {...iconProps} />;
    if (text.includes('certificate')) return <GraduationCap {...iconProps} />;
    if (text.includes('access')) return <KeyRound {...iconProps} />;
    if (text.includes('notes')) return <FileText {...iconProps} />;
    
    return <CheckCircle {...iconProps} />; // A default icon
};

const CourseDetailPage = ({ params }) => {
  const { slug } = params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const InfoPill = ({ icon, text }) => {
    const Icon = icon;
    return (
      <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
        <Icon size={16} />
        <span>{text}</span>
      </div>
    );
  };

  return (
    <main className="bg-slate-50">
      <div className="container mx-auto px-4 py-16 lg:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          
          <div className="lg:col-span-2">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mb-4">{course.name}</h1>
            <p className="text-lg text-slate-600 mb-6">{course.description}</p>
            
            <div className="flex items-center gap-4 mb-8">
              <img src={course.instructor.avatar} alt={course.instructor.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-slate-800">{course.instructor.name}</p>
                <p className="text-sm text-slate-500">Founder, Letsmakecompany</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-12">
              <InfoPill icon={Clock} text={course.duration} />
              <InfoPill icon={Award} text={`Validity: ${course.validity}`} />
              <InfoPill icon={BookOpen} text={course.language} />
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Lightbulb size={28} className="text-blue-500"/>What You'll Learn</h2>
              <ul className="space-y-3">
                {course.whatYoullLearn.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80">
                 <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Users size={28} className="text-blue-500"/>Requirements</h2>
                 <ul className="space-y-3">
                    {course.requirements.map((req, index) => (
                         <li key={index} className="flex items-start gap-3">
                            <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-slate-700">{req}</span>
                        </li>
                    ))}
                 </ul>
            </div>
          </div>

          <div className="w-full mt-12 lg:mt-0">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg overflow-hidden">
                <img src={course.img} alt={`${course.name} thumbnail`} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4 mb-4">
                     <p className="text-3xl font-bold text-slate-900">₹{course.price.toLocaleString()}</p>
                     <p className="text-xl font-medium text-slate-400 line-through">₹{course.originalPrice.toLocaleString()}</p>
                  </div>

                  <CourseEnrollButton course={course} />

                  {/* MODIFIED: This section now dynamically maps the data */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Materials Included</h3>
                    <ul className="space-y-3 text-sm">
                       {course.materialsIncluded.map((item, index) => (
                         <li key={index} className="flex items-center gap-3 text-slate-600">
                           {getIconForItem(item)}
                           <span>{item}</span>
                         </li>
                       ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseDetailPage;