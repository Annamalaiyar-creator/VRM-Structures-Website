import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  stars: number;
  ratingText: string;
  comment: string;
  avatar: string;
}

export default function Testimonials() {
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Kalpana Ram',
      role: 'Solar EPC Director',
      stars: 5,
      ratingText: '5.0',
      comment: 'VRM Structures delivers excellent-quality solar mounting solutions tailored to customer needs. Their products are durable and reliable, ensuring long-term performance. FRP walkways and mounting systems are of top-notch quality.',
      avatar: '',
    },
    {
      id: 2,
      name: 'Prakash John',
      role: 'Managing Director, RenewPower',
      stars: 5,
      ratingText: '5.0',
      comment: 'VRM Structures India Pvt Ltd is a trusted name for solar mounting structures. Their commitment to quality and service is remarkable. Their FRP walkways and non-penetrative roof models are excellent.',
      avatar: '',
    },
    {
      id: 3,
      name: 'Jameem Sulthan',
      role: 'Project Engineer, EnerGreen',
      stars: 5,
      ratingText: '5.0',
      comment: 'The non-penetrative sheet roof model was ideal for our site and delivered on time. The team provided excellent support throughout. Highly delighted with the FRP walkway they supplied.',
      avatar: '',
    },
    {
      id: 4,
      name: 'Abdul Fareed',
      role: 'Head of Procurement, SunRay Solar',
      stars: 5,
      ratingText: '5.0',
      comment: 'VRMSTRUCTURES offers cost-effective solutions without compromising on quality. Their products and service are exceptional. Their mounting structures are reliable and durable for long-term use.',
      avatar: '',
    },
    {
      id: 5,
      name: 'Arul Kumar',
      role: 'Founder, AK Solar Solutions',
      stars: 5,
      ratingText: '5.0',
      comment: 'VRM Structures offers premium solar mounting structures at competitive prices. Their technical expertise and timely delivery are commendable. A reliable choice for all solar installation needs.',
      avatar: '',
    },
    {
      id: 6,
      name: 'Abdul Hameed',
      role: 'Operations Head, Delta Solar',
      stars: 5,
      ratingText: '5.0',
      comment: 'VRMSTRUCTURES solutions are innovative, durable, and cost-effective. The team is professional and ensures customer satisfaction at every step. High quality products delivered within the promised timeline.',
      avatar: '',
    },
    {
      id: 7,
      name: 'Raja Sekaran',
      role: 'Site Supervisor, GreenGrid',
      stars: 5,
      ratingText: '5.0',
      comment: 'We appreciate VRM Structures India Pvt Ltd commitment to quality and customer satisfaction. Their non-penetrative roof models worked perfectly for our site.',
      avatar: '',
    },
    {
      id: 8,
      name: 'Rankith Natrajan',
      role: '',
      stars: 5,
      ratingText: '5.0',
      comment: 'Their technical expertise and innovative designs stand out. VRM Structures India Pvt Ltd. is a trusted partner for all solar mounting needs.',
      avatar: '',
    },
    {
      id: 9,
      name: 'Nandhakumar Ramu',
      role: '',
      stars: 5,
      ratingText: '5.0',
      comment: 'Exceptional Mounting Structures! VRM Structures provides durable, well-designed solutions with excellent service. Reliable team and timely delivery.',
      avatar: '',
    },
    {
      id: 10,
      name: 'Pradeep Kumar',
      role: '',
      stars: 5,
      ratingText: '5.0',
      comment: 'VRM Structures India Pvt Ltd exceeded our expectations with their innovative solutions and premium products. Highly recommended for solar projects!!!',
      avatar: '',
    },
    {
      id: 11,
      name: 'Saleem Khan A',
      role: '',
      stars: 5,
      ratingText: '5.0',
      comment: 'The team is highly professional and responsive throughout the process. Their FRP walkways are robust and perfect for heavy-duty applications.',
      avatar: '',
    },
    {
      id: 12,
      name: 'Mohameed',
      role: '',
      stars: 5,
      ratingText: '5.0',
      comment: 'Their attention to detail and commitment to excellence are impressive. The non-penetrative mounting models were perfect for our project.',
      avatar: '',
    },
    {
      id: 13,
      name: 'Cool Zone',
      role: '',
      stars: 5,
      ratingText: '5.0',
      comment: 'Very good product\'s and quality was good,correct time delivered the product.. really good experience with your service',
      avatar: '',
    },
    {
      id: 14,
      name: 'Daniel Raj',
      role: '',
      stars: 5,
      ratingText: '5.0',
      comment: 'Highly professional and dedicated service.',
      avatar: '',
    }
  ];

  // Duplicate list twice to make a seamless loop track for the continuous marquee
  const items = [...testimonials, ...testimonials];

  const headerVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const marqueeVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.15 }
    }
  };

  return (
    <section id="testimonials" className="py-[70px] px-4 sm:px-8 md:px-[50px] bg-slate-900 border-b border-slate-800 overflow-hidden w-full relative">
      {/* Decorative background glow for realistic atmosphere */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading matching the design system standard */}
        <motion.div 
          className="max-w-3xl mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <div className="flex items-center mb-4">
            <span className="font-mono text-teal-300 font-bold text-[12px]">Testimonials</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Trusted by Customers <span className="text-teal-300 font-bold">Nationwide.</span>
          </h2>
        </motion.div>

        {/* Endless Marquee Ticker Track running Left-to-Right */}
        <motion.div 
          className="relative overflow-hidden w-full py-4 -mx-4 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={marqueeVariants}
        >
          
          {/* Subtle fade-out side overlay masks for visual polish bleed */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
          
          {/* Marquee viewport moving track */}
          <div className="flex gap-6 w-max animate-marquee-ltr pause-on-hover">
            {items.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="w-[320px] sm:w-[350px] shrink-0 bg-slate-950/45 rounded-3xl border border-slate-800/80 p-6 shadow-sm hover:shadow-lg hover:border-teal-400/50 hover:bg-slate-950/80 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
              >
                {/* Header: Initials Avatar, Name & Gold Stars */}
                <div className="flex items-center gap-4">
                  {/* Small Circular initials avatar */}
                  <div className="w-12 h-12 rounded-full shrink-0 bg-slate-950 border border-slate-800 text-teal-300 font-extrabold text-sm flex items-center justify-center select-none shadow-2xs group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500 transition-colors duration-300">
                    {getInitials(item.name)}
                  </div>

                  {/* Near the Profile photo: Name & Gold Reviews */}
                  <div className="flex flex-col min-w-0">
                    <h4 className="text-sm font-bold text-white truncate text-left group-hover:text-teal-300 transition-colors">
                      {item.name}
                    </h4>

                    {/* Star reviews */}
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${
                              i < item.stars 
                                ? 'text-amber-400 fill-amber-400' 
                                : 'text-slate-800 fill-slate-800'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-[9px] font-bold text-slate-500 font-mono leading-none">
                        ({item.ratingText})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Below: Review content (truncated with '...' if longer than 110 chars) */}
                <div className="mt-4 flex-grow flex items-start">
                  <p className="text-xs text-slate-300 leading-relaxed font-normal italic text-left">
                    "{item.comment.length > 110 ? item.comment.substring(0, 110).trim() + "..." : item.comment}"
                  </p>
                </div>

              </div>
            ))}
          </div>
          
        </motion.div>

      </div>
    </section>
  );
}
