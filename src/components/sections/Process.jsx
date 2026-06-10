import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { processSteps } from '@/data/process';
import { SECTION_IDS } from '@/constants/theme';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

const STEP_GAP = 112;
const ICON_SIZE = 64;
const PATH_START_Y = 32;

function buildZigzagPath(stepCount) {
  const leftX = 8;
  const rightX = 92;

  let path = `M ${leftX} ${PATH_START_Y}`;

  for (let i = 1; i < stepCount; i++) {
    const y = PATH_START_Y + i * STEP_GAP;
    const x = i % 2 === 0 ? leftX : rightX;
    const midY = PATH_START_Y + (i - 0.5) * STEP_GAP;
    path += ` Q 50 ${midY}, ${x} ${y}`;
  }

  return path;
}

function StepIcon({ icon: Icon }) {
  return (
    <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-accent-blue/20 bg-white shadow-sm ring-4 ring-light">
      <Icon className="h-6 w-6 text-accent-blue" strokeWidth={1.75} />
    </div>
  );
}

function StepText({ index, title, alignRight }) {
  return (
    <div
      className={cn(
        'max-w-[58%] pt-3 sm:max-w-[55%]',
        alignRight ? 'text-right' : 'text-left',
      )}
    >
      <span className="text-xs font-semibold text-accent-blue">
        Step {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="mt-1 font-heading text-base font-semibold text-light-heading">
        {title}
      </h3>
    </div>
  );
}

function MobileProcessTimeline() {
  const pathHeight = PATH_START_Y + (processSteps.length - 1) * STEP_GAP + 32;
  const zigzagPath = buildZigzagPath(processSteps.length);

  return (
    <div className="relative lg:hidden" style={{ minHeight: pathHeight }}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 100 ${pathHeight}`}
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="processWaveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <path
          d={zigzagPath}
          stroke="url(#processWaveGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={zigzagPath}
          stroke="url(#processWaveGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="5 7"
          fill="none"
          opacity="0.9"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative z-10 flex flex-col">
        {processSteps.map((step, index) => {
          const isRight = index % 2 === 1;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: isRight ? 16 : -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex w-full items-start justify-between gap-6 px-0.5"
              style={{
                minHeight: index < processSteps.length - 1 ? STEP_GAP : ICON_SIZE + 16,
              }}
            >
              {isRight ? (
                <>
                  <StepText index={index} title={step.title} alignRight={false} />
                  <StepIcon icon={Icon} />
                </>
              ) : (
                <>
                  <StepIcon icon={Icon} />
                  <StepText index={index} title={step.title} alignRight />
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function DesktopProcessGrid() {
  return (
    <div className="relative hidden lg:grid lg:grid-cols-7 lg:gap-3">
      <div className="absolute left-[7%] right-[7%] top-10 h-px border-t border-dashed border-light-border" />

      {processSteps.map((step, index) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-light-border bg-white shadow-sm">
              <Icon className="h-6 w-6 text-accent-blue" strokeWidth={1.75} />
            </div>
            <div className="mt-4">
              <span className="text-xs font-semibold text-accent-blue">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-1 font-heading text-sm font-semibold text-light-heading lg:text-base">
                {step.title}
              </h3>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function Process() {
  const isMobile = useIsMobile();

  return (
    <section id={SECTION_IDS.process} className="section-padding section-light overflow-hidden">
      <Container>
        <SectionHeading
          label="Our Process"
          title="Simple, Transparent & Effective Process"
          subtitle="A proven methodology that delivers results — from discovery to ongoing support."
          variant="light"
        />

        <div className="relative mt-2">
          {isMobile ? <MobileProcessTimeline /> : <DesktopProcessGrid />}
        </div>
      </Container>
    </section>
  );
}
