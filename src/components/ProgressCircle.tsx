interface progressCircleI {
  percentage: number;
}

export const ProgressCircle = ({ percentage }: progressCircleI) => {
  return (
    <div
      className="progress-circle"
      style={{
        background: `conic-gradient(#8685ef ${
          percentage * 3.6
        }deg, rgba(255, 254, 254, 0) 0deg)`,
      }}
    >
      <div className="progress-circle-center">
        <span>{percentage}%</span>
      </div>
    </div>
  );
};
