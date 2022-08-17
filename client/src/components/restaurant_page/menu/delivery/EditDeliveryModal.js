import { useState } from "react";
import EditDeliveryCost from "./EditDeliveryCost";
import EditDeliveryStatus from "./EditDeliveryStatus";
import EditMinimumValue from "./EditMinimumValue";
import EditFreeDelivery from "./EditFreeDelivery";

const EditDeliveryModal = () => {

  const [deliverySettingState, setDeliverySettingState] = useState('deliveryCost');

  const showDeliverySetting = state => {
    if (state === 'deliveryCost') return <EditDeliveryCost />;
    else if (state === 'deliveryStatus') return <EditDeliveryStatus />;
    else if (state === 'minimumValue') return <EditMinimumValue />;
    else if (state === 'freeDelivery') return <EditFreeDelivery />;
  }

  return (
    <div className="delivery-modal">
      <h3>Delivery Settings</h3>
      <div className="delivery-settings">
        <div className="delivery-settings__element delivery-cost" onClick={() => setDeliverySettingState('deliveryCost')}>
          <h4>Delivery Cost</h4>
          <i className="fa fa-money" aria-hidden="true"></i>
        </div>
        <div className="delivery-settings__element delivery-status" onClick={() => setDeliverySettingState('deliveryStatus')}>
          <h4>Delivery Status</h4>
          <i className="fa fa-check-square-o" aria-hidden="true"></i>
        </div>
        <div className="delivery-settings__element minimum-value" onClick={() => setDeliverySettingState('minimumValue')}>
          <h4>Minimum Value</h4>
          <i className="fa fa-level-down" aria-hidden="true"></i>
        </div>
        <div className="delivery-settings__element free-delivery" onClick={() => setDeliverySettingState('freeDelivery')}>
          <h4>Free delivery</h4>
          <i className="fa fa-level-up" aria-hidden="true"></i>
        </div>
      </div>
      {showDeliverySetting(deliverySettingState)}

      {/* delivery: {
        deliveryCost: Number,
        deliveryActive: Boolean,
        minOrderCost: Number,
        orderCostToFreeDelivery: Number
      }, */}
    </div>
  );
}
export default EditDeliveryModal;