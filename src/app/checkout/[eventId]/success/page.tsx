export type CheckoutSuccessPageProps = {
  params: { eventId: string };
};

const CheckoutSuccessPage = ({ params }: CheckoutSuccessPageProps) => {
  return (
    <>
      <div>CheckoutSuccessPage</div>
      <div>{params.eventId}</div>
    </>
  );
};

export default CheckoutSuccessPage;
