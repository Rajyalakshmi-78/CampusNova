import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bot,
  Wrench,
  Search,
  Calendar,
  MapPin,
  CheckCircle2,
  Users,
  Compass,
} from "lucide-react";

import Campus3DBackground from "../components/Campus3DBackground";

/* =========================================================
   ANIMATION SETTINGS
   ========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* =========================================================
   3D TILT CARD
   ========================================================= */

function TiltCard({ children, className = "", ...props }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      whileHover={{
        y: -10,
        rotateX: 3,
        rotateY: -3,
        scale: 1.015,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   FLOATING 3D HERO OBJECT
   ========================================================= */

function Hero3DObject() {
  return (
    <div
      className="
        absolute
        pointer-events-none
        hidden
        lg:block
        right-[4%]
        top-[17%]
        w-32
        h-32
      "
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotateX: [0, 12, 0],
          rotateY: [0, 25, 0],
          rotateZ: [0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative
          w-full
          h-full
          rounded-[2rem]
          border
          border-cyan-400/40
          bg-gradient-to-br
          from-cyan-400/20
          via-blue-500/10
          to-transparent
          backdrop-blur-xl
          shadow-[0_30px_80px_rgba(6,182,212,0.25)]
        "
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Inner core */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            inset-7
            rounded-2xl
            bg-gradient-to-br
            from-blue-500
            to-cyan-400
            shadow-[0_0_40px_rgba(34,211,238,0.7)]
          "
          style={{
            transform: "translateZ(30px)",
          }}
        />

        {/* Floating ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            -inset-5
            rounded-full
            border
            border-cyan-400/20
          "
        />
      </motion.div>
    </div>
  );
}

/* =========================================================
   HOME PAGE
   ========================================================= */

export default function Home() {
  return (
    <div
      className="
        relative
        min-h-screen
        text-slate-900
        dark:text-white
        overflow-hidden
        transition-colors
      "
    >

      {/* =====================================================
          3D BACKGROUND
          ===================================================== */}

      <Campus3DBackground />

      {/* Ambient Cyan Glow */}
      <div
        className="
          absolute
          top-1/4
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[600px]
          h-[600px]
          bg-cyan-500/10
          dark:bg-cyan-500/15
          blur-[160px]
          rounded-full
          pointer-events-none
          -z-10
        "
      />

      {/* Ambient Blue Glow */}
      <div
        className="
          absolute
          bottom-1/3
          left-10
          w-[500px]
          h-[500px]
          bg-blue-600/10
          dark:bg-blue-600/15
          blur-[150px]
          rounded-full
          pointer-events-none
          -z-10
        "
      />

      {/* =====================================================
          HERO SECTION
          ===================================================== */}

      <section
        className="
          relative
          min-h-[92vh]
          flex
          items-center
          justify-center
          pt-28
          pb-16
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <Hero3DObject />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="
            max-w-5xl
            mx-auto
            text-center
            relative
            z-10
          "
        >

          {/* Badge */}

          <motion.div
            variants={fadeUp}
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-1.5
              rounded-full
              bg-slate-100/80
              dark:bg-white/5
              border
              border-cyan-500/30
              text-cyan-600
              dark:text-cyan-400
              backdrop-blur-md
              mb-8
              shadow-sm
            "
          >
            <Sparkles
              className="w-3.5 h-3.5"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <span
              className="
                text-xs
                font-mono
                font-bold
                tracking-widest
                uppercase
              "
            >
              THE NEXT-GEN SMART CAMPUS OS
            </span>
          </motion.div>

          {/* Hero Heading */}

          <motion.h1
            variants={fadeUp}
            className="
              text-4xl
              sm:text-6xl
              lg:text-7xl
              font-black
              tracking-tight
              leading-[1.08]
              mb-6
            "
          >
            ONE CAMPUS.
            <br />

            <span
              className="
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-blue-600
                via-cyan-500
                to-cyan-400
              "
            >
              ONE SMART ECOSYSTEM.
            </span>
          </motion.h1>

          {/* Subtitle */}

          <motion.p
            variants={fadeUp}
            className="
              max-w-2xl
              mx-auto
              text-base
              sm:text-lg
              text-slate-600
              dark:text-slate-300
              font-light
              leading-relaxed
              mb-10
            "
          >
            Everything your campus needs. Connected in one intelligent
            experience. From AI spatial navigation and rapid issue
            resolution to unified security.
          </motion.p>

          {/* Buttons */}

          <motion.div
            variants={fadeUp}
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-4
            "
          >
            <Link
              to="/map"
              className="
                group
                w-full
                sm:w-auto
                px-8
                py-4
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                hover:from-blue-500
                hover:to-cyan-400
                text-white
                font-mono
                font-bold
                tracking-wider
                text-xs
                sm:text-sm
                flex
                items-center
                justify-center
                gap-3
                shadow-lg
                shadow-cyan-500/25
                transition-all
              "
            >
              <Compass
                className="
                  w-4
                  h-4
                  group-hover:rotate-12
                  transition-transform
                "
              />

              EXPLORE CAMPUS

              <ArrowRight
                className="
                  w-4
                  h-4
                  group-hover:translate-x-1
                  transition-transform
                "
              />
            </Link>

            <Link
              to="/dashboard"
              className="
                group
                w-full
                sm:w-auto
                px-8
                py-4
                rounded-xl
                bg-slate-100
                dark:bg-white/5
                hover:bg-slate-200
                dark:hover:bg-white/10
                border
                border-slate-300
                dark:border-white/15
                text-slate-800
                dark:text-white
                font-mono
                font-semibold
                tracking-wider
                text-xs
                sm:text-sm
                flex
                items-center
                justify-center
                gap-3
                backdrop-blur-md
                transition-all
              "
            >
              ENTER DASHBOARD

              <ArrowRight
                className="
                  w-4
                  h-4
                  text-cyan-500
                  group-hover:translate-x-2
                  transition-transform
                "
              />
            </Link>
          </motion.div>

          {/* =================================================
              FLOATING STAT CARDS
              ================================================= */}

          <motion.div
            variants={fadeUp}
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
              mt-16
              pt-8
              border-t
              border-slate-200
              dark:border-white/10
            "
          >

            {/* Students */}

            <motion.div
              whileHover={{
                y: -8,
                rotateX: 5,
                rotateY: -5,
              }}
              className="
                p-4
                rounded-2xl
                bg-white/70
                dark:bg-slate-900/60
                border
                border-slate-200
                dark:border-white/10
                backdrop-blur-md
                shadow-sm
              "
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="
                  text-2xl
                  sm:text-3xl
                  font-black
                  text-blue-600
                  dark:text-blue-400
                  font-mono
                "
              >
                12,482
              </div>

              <p
                className="
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                  font-medium
                  mt-0.5
                "
              >
                Active Students
              </p>
            </motion.div>

            {/* Issues */}

            <motion.div
              whileHover={{
                y: -8,
                rotateX: 5,
                rotateY: 5,
              }}
              className="
                p-4
                rounded-2xl
                bg-white/70
                dark:bg-slate-900/60
                border
                border-slate-200
                dark:border-white/10
                backdrop-blur-md
                shadow-sm
              "
            >
              <div
                className="
                  text-2xl
                  sm:text-3xl
                  font-black
                  text-emerald-500
                  font-mono
                "
              >
                98%
              </div>

              <p
                className="
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                  font-medium
                  mt-0.5
                "
              >
                Issues Resolved
              </p>
            </motion.div>

            {/* Events */}

            <motion.div
              whileHover={{
                y: -8,
                rotateX: 5,
                rotateY: -5,
              }}
              className="
                p-4
                rounded-2xl
                bg-white/70
                dark:bg-slate-900/60
                border
                border-slate-200
                dark:border-white/10
                backdrop-blur-md
                shadow-sm
              "
            >
              <div
                className="
                  text-2xl
                  sm:text-3xl
                  font-black
                  text-cyan-500
                  font-mono
                "
              >
                240+
              </div>

              <p
                className="
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                  font-medium
                  mt-0.5
                "
              >
                Events Hosted
              </p>
            </motion.div>

            {/* Security */}

            <motion.div
              whileHover={{
                y: -8,
                rotateX: 5,
                rotateY: 5,
              }}
              className="
                p-4
                rounded-2xl
                bg-white/70
                dark:bg-slate-900/60
                border
                border-slate-200
                dark:border-white/10
                backdrop-blur-md
                shadow-sm
              "
            >
              <div
                className="
                  text-2xl
                  sm:text-3xl
                  font-black
                  text-slate-900
                  dark:text-white
                  font-mono
                  flex
                  items-center
                  justify-center
                  gap-1.5
                "
              >
                <motion.span
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
                    w-2.5
                    h-2.5
                    rounded-full
                    bg-emerald-500
                  "
                />

                SECURE
              </div>

              <p
                className="
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                  font-medium
                  mt-0.5
                "
              >
                Campus Perimeter
              </p>
            </motion.div>

          </motion.div>
        </motion.div>
      </section>

      {/* =====================================================
          SECTION 1 — VISION
          ===================================================== */}

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="
          py-24
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            gap-12
            items-center
          "
        >

          <motion.div
            variants={fadeUp}
            className="
              lg:col-span-6
              space-y-6
            "
          >
            <span
              className="
                text-xs
                font-mono
                uppercase
                tracking-widest
                text-cyan-500
                font-bold
              "
            >
              THE VISION
            </span>

            <h2
              className="
                text-3xl
                sm:text-5xl
                font-black
                tracking-tight
                leading-tight
              "
            >
              Your Campus.
              <br />

              <span
                className="
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-400
                "
              >
                Reimagined.
              </span>
            </h2>

            <p
              className="
                text-slate-600
                dark:text-slate-300
                text-sm
                sm:text-base
                leading-relaxed
                font-light
              "
            >
              Traditional campuses are fragmented across disjointed
              portals, bulletin boards, and slow ticket desks.
              CampusNova synchronizes student logistics, academic
              facilities, and emergency protocols into a unified,
              responsive digital membrane.
            </p>

            <div
              className="
                space-y-3
                pt-2
                font-medium
                text-xs
                sm:text-sm
              "
            >
              {[
                "Real-time spatial telemetry across 9 major campus zones",
                "AI-powered automated lost & found visual matching",
                "Instant dispatch for facility and electrical maintenance",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    className="
                      w-4
                      h-4
                      text-cyan-500
                      shrink-0
                    "
                  />

                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}

          <TiltCard
            className="
              lg:col-span-6
              relative
              rounded-3xl
              overflow-hidden
              shadow-2xl
              border
              border-slate-200
              dark:border-white/10
              group
              aspect-[4/3]
              bg-slate-950
            "
          >
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
              alt="Futuristic Campus Architecture"
              className="
                w-full
                h-full
                object-cover
                group-hover:scale-110
                transition-transform
                duration-700
                filter
                brightness-95
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-slate-950/80
                via-transparent
                to-transparent
              "
            />

            <div
              className="
                absolute
                bottom-6
                left-6
                right-6
                flex
                items-center
                justify-between
                text-white
                font-mono
                text-xs
              "
            >
              <span
                className="
                  bg-black/60
                  backdrop-blur-md
                  px-3
                  py-1
                  rounded-lg
                  border
                  border-white/10
                "
              >
                CENTRAL BIOMEDICAL CONCOURSE
              </span>

              <span className="text-cyan-400">
                NODE #09 VERIFIED
              </span>
            </div>
          </TiltCard>

        </div>
      </motion.section>

      {/* =====================================================
          SECTION 2 — BENTO ECOSYSTEM
          ===================================================== */}

      <section
        className="
          py-24
          bg-slate-100/60
          dark:bg-[#050b18]/60
          border-y
          border-slate-200
          dark:border-white/5
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="
              text-center
              max-w-2xl
              mx-auto
              mb-16
            "
          >
            <span
              className="
                text-xs
                font-mono
                uppercase
                tracking-widest
                text-cyan-500
                font-bold
              "
            >
              UNIFIED SUITE
            </span>

            <h2
              className="
                text-3xl
                sm:text-4xl
                font-black
                tracking-tight
                mt-1
              "
            >
              THE CAMPUSNOVA BENTO ECOSYSTEM
            </h2>

            <p
              className="
                text-xs
                sm:text-sm
                text-slate-500
                dark:text-slate-400
                mt-2
              "
            >
              Engineered with distinct visual patterns tailored
              for high-efficiency operations.
            </p>
          </motion.div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              lg:grid-cols-4
              gap-6
            "
          >

            {/* NOVA AI */}

            <TiltCard
              className="
                md:col-span-2
                p-8
                rounded-3xl
                bg-white
                dark:bg-[#0a1226]
                border
                border-slate-200
                dark:border-white/10
                hover:border-cyan-500/50
                transition-all
                shadow-sm
                hover:shadow-[0_25px_70px_rgba(6,182,212,0.15)]
                group
                flex
                flex-col
                justify-between
              "
            >
              <Link to="/ai" className="h-full flex flex-col justify-between">

                <div>
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-4
                    "
                  >
                    <motion.div
                      whileHover={{
                        rotate: 8,
                        scale: 1.1,
                      }}
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-cyan-500/10
                        border
                        border-cyan-500/30
                        flex
                        items-center
                        justify-center
                        text-cyan-500
                      "
                    >
                      <Bot className="w-6 h-6" />
                    </motion.div>

                    <span
                      className="
                        text-[10px]
                        font-mono
                        font-bold
                        bg-cyan-500/10
                        text-cyan-600
                        dark:text-cyan-400
                        px-2.5
                        py-0.5
                        rounded-full
                        border
                        border-cyan-500/20
                      "
                    >
                      3D AI ORB
                    </span>
                  </div>

                  <h3
                    className="
                      text-xl
                      font-bold
                      mb-2
                      group-hover:text-cyan-500
                      transition-colors
                    "
                  >
                    Nova AI Spatial Assistant
                  </h3>

                  <p
                    className="
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                      leading-relaxed
                      font-light
                    "
                  >
                    Real-time interactive voice & chat companion
                    powered by R3F WebGL. Answers class schedules,
                    campus policies, and seat availability.
                  </p>
                </div>

                <div
                  className="
                    pt-6
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-mono
                    text-cyan-600
                    dark:text-cyan-400
                    font-semibold
                  "
                >
                  LAUNCH NOVA INTERFACE

                  <ArrowRight
                    className="
                      w-4
                      h-4
                      group-hover:translate-x-2
                      transition-transform
                    "
                  />
                </div>

              </Link>
            </TiltCard>

            {/* SMART ISSUES */}

            <TiltCard
              className="
                p-8
                rounded-3xl
                bg-white
                dark:bg-[#0a1226]
                border
                border-slate-200
                dark:border-white/10
                hover:border-blue-500/50
                transition-all
                shadow-sm
                hover:shadow-xl
                group
              "
            >
              <Link
                to="/issues"
                className="
                  h-full
                  flex
                  flex-col
                  justify-between
                "
              >
                <div>
                  <div
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-blue-500/10
                      border
                      border-blue-500/30
                      flex
                      items-center
                      justify-center
                      text-blue-500
                      mb-4
                    "
                  >
                    <Wrench className="w-6 h-6" />
                  </div>

                  <h3
                    className="
                      text-lg
                      font-bold
                      mb-2
                      group-hover:text-blue-500
                      transition-colors
                    "
                  >
                    Smart Issues
                  </h3>

                  <p
                    className="
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                      leading-relaxed
                      font-light
                    "
                  >
                    See it. Report it. Track resolution statuses
                    across classrooms and labs.
                  </p>
                </div>

                <div
                  className="
                    pt-6
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-mono
                    text-blue-600
                    dark:text-blue-400
                    font-semibold
                  "
                >
                  VIEW LEDGER

                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </TiltCard>

            {/* LOST & FOUND */}

            <TiltCard
              className="
                p-8
                rounded-3xl
                bg-white
                dark:bg-[#0a1226]
                border
                border-slate-200
                dark:border-white/10
                hover:border-amber-500/50
                transition-all
                shadow-sm
                hover:shadow-xl
                group
              "
            >
              <Link
                to="/lost-found"
                className="
                  h-full
                  flex
                  flex-col
                  justify-between
                "
              >
                <div>
                  <div
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-amber-500/10
                      border
                      border-amber-500/30
                      flex
                      items-center
                      justify-center
                      text-amber-500
                      mb-4
                    "
                  >
                    <Search className="w-6 h-6" />
                  </div>

                  <h3
                    className="
                      text-lg
                      font-bold
                      mb-2
                      group-hover:text-amber-500
                      transition-colors
                    "
                  >
                    Lost & Found
                  </h3>

                  <p
                    className="
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                      leading-relaxed
                      font-light
                    "
                  >
                    Algorithmic similarity matching with 94%+
                    match confidence scoring.
                  </p>
                </div>

                <div
                  className="
                    pt-6
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-mono
                    text-amber-600
                    dark:text-amber-400
                    font-semibold
                  "
                >
                  FIND ITEMS

                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </TiltCard>

            {/* EVENTS */}

            <TiltCard
              className="
                p-8
                rounded-3xl
                bg-white
                dark:bg-[#0a1226]
                border
                border-slate-200
                dark:border-white/10
                hover:border-cyan-500/50
                transition-all
                shadow-sm
                hover:shadow-xl
                group
              "
            >
              <Link
                to="/events"
                className="
                  h-full
                  flex
                  flex-col
                  justify-between
                "
              >
                <div>
                  <div
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-cyan-500/10
                      border
                      border-cyan-500/30
                      flex
                      items-center
                      justify-center
                      text-cyan-500
                      mb-4
                    "
                  >
                    <Calendar className="w-6 h-6" />
                  </div>

                  <h3
                    className="
                      text-lg
                      font-bold
                      mb-2
                      group-hover:text-cyan-500
                      transition-colors
                    "
                  >
                    Campus Events
                  </h3>

                  <p
                    className="
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                      leading-relaxed
                      font-light
                    "
                  >
                    Discover hackathons, symposia, and cultural
                    galas with instant pass booking.
                  </p>
                </div>

                <div
                  className="
                    pt-6
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-mono
                    text-cyan-600
                    dark:text-cyan-400
                    font-semibold
                  "
                >
                  EXPLORE PASSES

                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </TiltCard>

            {/* CAMPUS MAP */}

            <TiltCard
              className="
                md:col-span-2
                p-8
                rounded-3xl
                bg-white
                dark:bg-[#0a1226]
                border
                border-slate-200
                dark:border-white/10
                hover:border-blue-500/50
                transition-all
                shadow-sm
                hover:shadow-xl
                group
              "
            >
              <Link
                to="/map"
                className="
                  h-full
                  flex
                  flex-col
                  justify-between
                "
              >
                <div>
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      mb-4
                    "
                  >
                    <div
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-blue-500/10
                        border
                        border-blue-500/30
                        flex
                        items-center
                        justify-center
                        text-blue-500
                      "
                    >
                      <MapPin className="w-6 h-6" />
                    </div>

                    <span
                      className="
                        text-[10px]
                        font-mono
                        font-bold
                        bg-blue-500/10
                        text-blue-600
                        dark:text-blue-400
                        px-2.5
                        py-0.5
                        rounded-full
                        border
                        border-blue-500/20
                      "
                    >
                      ISOMETRIC MAP
                    </span>
                  </div>

                  <h3
                    className="
                      text-xl
                      font-bold
                      mb-2
                      group-hover:text-blue-500
                      transition-colors
                    "
                  >
                    Interactive Spatial Map
                  </h3>

                  <p
                    className="
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                      leading-relaxed
                      font-light
                    "
                  >
                    Clickable glowing building nodes, live occupancy
                    gauges, and quiet zone tracking across 9 major
                    campus complexes.
                  </p>
                </div>

                <div
                  className="
                    pt-6
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-mono
                    text-blue-600
                    dark:text-blue-400
                    font-semibold
                  "
                >
                  OPEN NAVIGATION MATRIX

                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </TiltCard>

            {/* SAFETY */}

            <TiltCard
              className="
                p-8
                rounded-3xl
                bg-white
                dark:bg-[#0a1226]
                border
                border-slate-200
                dark:border-white/10
                hover:border-emerald-500/50
                transition-all
                shadow-sm
                hover:shadow-xl
                group
              "
            >
              <Link
                to="/safety"
                className="
                  h-full
                  flex
                  flex-col
                  justify-between
                "
              >
                <div>
                  <div
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-emerald-500/10
                      border
                      border-emerald-500/30
                      flex
                      items-center
                      justify-center
                      text-emerald-500
                      mb-4
                    "
                  >
                    <ShieldCheck className="w-6 h-6" />
                  </div>

                  <h3
                    className="
                      text-lg
                      font-bold
                      mb-2
                      group-hover:text-emerald-500
                      transition-colors
                    "
                  >
                    Safety Center
                  </h3>

                  <p
                    className="
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                      leading-relaxed
                      font-light
                    "
                  >
                    Emergency panic triggers, automated beacon
                    checkpoints, and 24/7 dispatch.
                  </p>
                </div>

                <div
                  className="
                    pt-6
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-mono
                    text-emerald-600
                    dark:text-emerald-400
                    font-semibold
                  "
                >
                  COMMAND CENTER

                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </TiltCard>

          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 3 — CINEMATIC STUDENT LIFE
          ===================================================== */}

      <section
        className="
          py-24
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <TiltCard
          className="
            relative
            rounded-3xl
            overflow-hidden
            border
            border-slate-200
            dark:border-white/10
            aspect-[21/9]
            sm:aspect-[2.39/1]
            shadow-2xl
            bg-slate-950
          "
        >
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
            alt="Collaborative Smart Campus Students"
            className="
              w-full
              h-full
              object-cover
              filter
              brightness-90
              contrast-105
              transition-transform
              duration-1000
              hover:scale-105
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-slate-950
              via-slate-950/40
              to-transparent
            "
          />

          <div
            className="
              absolute
              bottom-8
              left-8
              sm:bottom-12
              sm:left-12
              max-w-lg
              text-white
              space-y-3
            "
          >
            <span
              className="
                text-[11px]
                font-mono
                tracking-widest
                text-cyan-400
                uppercase
                font-bold
              "
            >
              CONNECTED GENERATION
            </span>

            <h3
              className="
                text-2xl
                sm:text-4xl
                font-black
                leading-tight
              "
            >
              Designed for Scholars, Innovators, and Visionaries.
            </h3>

            <p
              className="
                text-xs
                sm:text-sm
                text-slate-300
                font-light
              "
            >
              Experience the friction-free rhythm of modern
              academia where intelligent technology handles the
              logistics so you can build the future.
            </p>
          </div>
        </TiltCard>
      </section>

      {/* =====================================================
          SECTION 4 — INTELLIGENCE STATS
          ===================================================== */}

      <section
        className="
          py-20
          bg-slate-100/50
          dark:bg-[#030712]/50
          border-t
          border-slate-200
          dark:border-white/5
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-8
              text-center
            "
          >
            {[
              {
                value: "18.4 min",
                label: "Average Ticket Response Time",
                color: "text-blue-600 dark:text-blue-400",
              },
              {
                value: "94.8%",
                label: "Lost Item Recovery Rate",
                color: "text-cyan-500",
              },
              {
                value: "100%",
                label: "Perimeter Telemetry Coverage",
                color: "text-emerald-500",
              },
              {
                value: "48 Nodes",
                label: "Connected IoT Campus Hubs",
                color: "text-slate-900 dark:text-white",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
              >
                <div
                  className={`
                    text-3xl
                    sm:text-5xl
                    font-extrabold
                    font-mono
                    ${stat.color}
                  `}
                >
                  {stat.value}
                </div>

                <p
                  className="
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                    uppercase
                    tracking-widest
                    mt-2
                  "
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 5 — NEURAL NETWORK
          ===================================================== */}

      <section
        className="
          py-24
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            text-center
            max-w-2xl
            mx-auto
            mb-16
          "
        >
          <span
            className="
              text-xs
              font-mono
              uppercase
              tracking-widest
              text-cyan-500
              font-bold
            "
          >
            NEURAL NETWORK ARCHITECTURE
          </span>

          <h2
            className="
              text-3xl
              sm:text-4xl
              font-black
              tracking-tight
              mt-1
            "
          >
            EVERYTHING CONNECTED.
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              text-slate-500
              dark:text-slate-400
              mt-2
              font-light
            "
          >
            Continuous real-time synchronization between the
            student body, spatial intelligence, and automated
            operations.
          </p>
        </motion.div>

        <div
          className="
            relative
            p-8
            sm:p-12
            rounded-3xl
            bg-white
            dark:bg-[#070e22]
            border
            border-slate-200
            dark:border-white/10
            shadow-2xl
            overflow-hidden
          "
        >
          {/* Animated background grid */}

          <div
            className="
              absolute
              inset-0
              opacity-20
              pointer-events-none
            "
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-6
              gap-6
              relative
              z-10
            "
          >
            {[
              {
                label: "Student",
                sub: "Biometric Identity",
                icon: Users,
                color: "text-blue-500",
              },
              {
                label: "Nova AI",
                sub: "Autonomous Agent",
                icon: Bot,
                color: "text-cyan-400",
              },
              {
                label: "Campus Map",
                sub: "Spatial Mesh",
                icon: MapPin,
                color: "text-blue-400",
              },
              {
                label: "Events",
                sub: "Social Fabric",
                icon: Calendar,
                color: "text-cyan-500",
              },
              {
                label: "Safety",
                sub: "Perimeter Shield",
                icon: ShieldCheck,
                color: "text-emerald-400",
              },
              {
                label: "Services",
                sub: "Maintenance Grid",
                icon: Wrench,
                color: "text-blue-500",
              },
            ].map((node, i) => {
              const Icon = node.icon;

              return (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                  }}
                  whileHover={{
                    y: -10,
                    rotateX: 5,
                    rotateY: -5,
                    scale: 1.04,
                  }}
                  className="
                    p-5
                    rounded-2xl
                    bg-slate-50
                    dark:bg-white/5
                    border
                    border-slate-200
                    dark:border-white/10
                    hover:border-cyan-500/40
                    transition-colors
                    flex
                    flex-col
                    items-center
                    justify-center
                    space-y-3
                  "
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`
                      w-12
                      h-12
                      rounded-xl
                      bg-slate-100
                      dark:bg-white/5
                      flex
                      items-center
                      justify-center
                      ${node.color}
                      shadow-sm
                    `}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  <div>
                    <h4
                      className="
                        text-sm
                        font-bold
                        text-slate-900
                        dark:text-white
                        text-center
                      "
                    >
                      {node.label}
                    </h4>

                    <p
                      className="
                        text-[10px]
                        font-mono
                        text-slate-400
                        mt-0.5
                        text-center
                      "
                    >
                      {node.sub}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div
            className="
              mt-10
              pt-6
              border-t
              border-slate-200
              dark:border-white/5
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              text-xs
              font-mono
              text-slate-500
              dark:text-slate-400
              gap-4
              relative
              z-10
            "
          >
            <span
              className="
                flex
                items-center
                gap-2
              "
            >
              <motion.span
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.4, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-cyan-400
                "
              />

              ACTIVE NEURAL SYNAPSE BUS [AES-256 ENCRYPTED]
            </span>

            <span>
              END-TO-END FRONTEND LOCAL ORCHESTRATION
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CALL TO ACTION
          ===================================================== */}

      <section
        className="
          py-24
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            p-10
            sm:p-16
            rounded-3xl
            bg-gradient-to-r
            from-blue-900/40
            via-slate-900
            to-cyan-900/30
            border
            border-cyan-500/30
            text-center
            relative
            overflow-hidden
            shadow-2xl
          "
        >

          {/* Moving glow */}

          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              top-0
              left-0
              w-1/2
              h-full
              bg-gradient-to-r
              from-transparent
              via-cyan-400/10
              to-transparent
              pointer-events-none
            "
          />

          <div
            className="
              relative
              z-10
              max-w-2xl
              mx-auto
              space-y-6
            "
          >
            <span
              className="
                text-xs
                font-mono
                uppercase
                tracking-widest
                text-cyan-400
                font-bold
              "
            >
              THE NEXT GENERATION IS HERE
            </span>

            <h2
              className="
                text-3xl
                sm:text-5xl
                font-black
                text-white
                tracking-tight
              "
            >
              CAMPUS LIFE, REIMAGINED.
            </h2>

            <p
              className="
                text-xs
                sm:text-sm
                text-slate-300
                font-light
                leading-relaxed
              "
            >
              Unlock your verified digital student profile,
              report campus infrastructure faults, navigate
              building occupancy, and converse with Nova AI today.
            </p>

            <div
              className="
                pt-2
                flex
                flex-col
                sm:flex-row
                items-center
                justify-center
                gap-4
              "
            >
              <Link
                to="/dashboard"
                className="
                  group
                  w-full
                  sm:w-auto
                  px-8
                  py-4
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  hover:from-blue-500
                  hover:to-cyan-400
                  text-white
                  font-mono
                  font-bold
                  text-xs
                  sm:text-sm
                  tracking-wider
                  shadow-lg
                  shadow-cyan-500/25
                  transition-all
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                ACCESS STUDENT DASHBOARD

                <ArrowRight
                  className="
                    w-4
                    h-4
                    group-hover:translate-x-1
                    transition-transform
                  "
                />
              </Link>

              <Link
                to="/ai"
                className="
                  group
                  w-full
                  sm:w-auto
                  px-8
                  py-4
                  rounded-xl
                  bg-white/10
                  hover:bg-white/20
                  border
                  border-white/20
                  text-white
                  font-mono
                  text-xs
                  sm:text-sm
                  tracking-wider
                  transition-colors
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <Bot className="w-4 h-4 text-cyan-400" />

                TRY NOVA AI (3D)

                <ArrowRight
                  className="
                    w-4
                    h-4
                    group-hover:translate-x-1
                    transition-transform
                  "
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}

