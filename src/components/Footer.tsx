import { Activity, Users, BarChart2, Settings, Zap, BookType, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgHover: string;
  delay: number;
}

function Footer() {
  // Feature data for mapping
  const features: Feature[] = [
    {
      title: "Real-time\nFeedback",
      description: "Get instant feedback of typing-speed / accuracy.",
      icon: Activity,
      color: "text-emerald-400",
      bgHover: "hover:bg-emerald-900/10",
      delay: 0
    },
    {
      title: "Challenge\nFriends",
      description: "Compete with friends in real-time typing races.",
      icon: Users,
      color: "text-sky-400",
      bgHover: "hover:bg-sky-900/10",
      delay: 0.1
    },
    {
      title: "Detailed\nStatistics",
      description: "Track progress over time with comprehensive stats.",
      icon: BarChart2,
      color: "text-yellow-400",
      bgHover: "hover:bg-yellow-900/10",
      delay: 0.2
    },
    {
      title: "Customizable\nOptions",
      description: "Personalize your typing experience.",
      icon: Settings,
      color: "text-purple-400",
      bgHover: "hover:bg-purple-900/10",
      delay: 0.3
    },
    {
      title: "Minimalist\nInterface",
      description: "Clean and focused design for better concentration.",
      icon: Zap,
      color: "text-[#F2F9FF]",
      bgHover: "hover:bg-blue-900/10",
      delay: 0.4
    },
    {
      title: "Improved\nPerformance",
      description: "Added some features which improves performance.",
      icon: BookType,
      color: "text-[#F4D793]",
      bgHover: "hover:bg-amber-900/10",
      delay: 0.5
    }
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Card animation variants
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: index * 0.1
      }
    }),
    hover: {
      y: -5,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  // Icon animation variants
  const iconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="mt-5 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className={`bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 ${feature.bgHover} transition-all duration-300`}
            variants={cardVariants}
            custom={index}
            whileHover="hover"
          >
            <motion.h3 className={`flex content-center ${feature.color} font-medium text-lg whitespace-pre-line mb-2`}>
              <motion.div
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                className="mr-5 mt-3"
              >
                <feature.icon className={feature.color} />
              </motion.div>
              {feature.title}
            </motion.h3>
            <motion.p
              className="text-zinc-400 text-sm"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {feature.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Footer;


