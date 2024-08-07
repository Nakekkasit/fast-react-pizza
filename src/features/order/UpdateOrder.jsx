import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export async function action({ params }) {
  await updateOrder(params.orderId, { priority: true });
  return null;
}

export default UpdateOrder;
