import { Link } from "react-router-dom";
import Footer from "./Footer";
import { motion } from "framer-motion";

const Home = () => {
  // Animation variants
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
      className="flex flex-col items-center pt-[100px] text-5xl text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p className="font-bold" variants={itemVariants}>
        Master Your Typing Skills
      </motion.p>
      
      <motion.div className="flex mt-4 space-x-3" variants={itemVariants}>
        <p className="font-bold">with</p>
        <motion.p
          className="text-[rgb(59,207,161)] font-bold"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          SwiftKeys
        </motion.p>
      </motion.div>
      
      <motion.div className="text-center text-gray-400 text-lg mt-5" variants={itemVariants}>
        <p>Practice typing, challenge friends, and track improvements with</p>
        <p>real-time stats in a sleek, minimalist interface.</p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Link to={"/type"}>
          <motion.button
            className="py-2 px-4 mt-[50px] bg-emerald-500 text-sm text-white rounded flex items-center justify-center space-x-2 group"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <span>Start Typing Now</span>
            <motion.span
              variants={arrowVariants}
              initial="initial"
              inherit="hover"
              className="group-hover:translate-x-1"
            >
              →
            </motion.span>
          </motion.button>
        </Link>
      </motion.div>
      
      <motion.div
        className="pt-[50px] text-white text-4xl font-bold"
        variants={itemVariants}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p>Why Choose SwiftKeys?</p>
      </motion.div>
      
      <Footer />
    </motion.div>
  );
};

export default Home;