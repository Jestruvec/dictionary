interface Props {
  className?: string;
}

export const DotsLoading = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className="loader"> </div>
    </div>
  );
};
