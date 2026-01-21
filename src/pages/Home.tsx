import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "rgb(5, 150, 105)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const arrowVariants = {
    hover: { x: 5 },
    initial: { x: 0 }
  };

  return (
    <motion.div
      className="h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-4xl sm:text-5xl font-bold text-white text-center mt-36" variants={itemVariants}>
        Master Your Typing Skills
      </motion.h1>

      <motion.div className="flex mt-3 space-x-3 text-4xl sm:text-5xl" variants={itemVariants}>
        <p className="font-bold text-white">with</p>
        <motion.p
          className="text-emerald-400 font-bold"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          SwiftKeys
        </motion.p>
      </motion.div>

      <motion.div className="text-center text-gray-400 text-base sm:text-lg mt-4 max-w-2xl" variants={itemVariants}>
        <p>Practice typing, challenge friends, and track improvements with</p>
        <p>real-time stats in a sleek, minimalist interface.</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Link to="/type">
          <motion.button
            className="py-2 px-4 mt-8 bg-emerald-500 text-sm text-white rounded flex items-center justify-center space-x-2 group"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Start typing practice"
          >
            <span>Start Typing Now</span>
            <motion.span
              variants={arrowVariants}
              initial="initial"
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </motion.span>
          </motion.button>
        </Link>
      </motion.div>

      <motion.h2
        className="pt-8 text-white text-2xl sm:text-3xl font-bold text-center"
        variants={itemVariants}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Why Choose SwiftKeys?
      </motion.h2>
      <Footer/>
    </motion.div>
  );
};

export default Home;