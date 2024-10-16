import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCol,
  IonIcon,
  IonRadioGroup,
  IonRow,
} from "@ionic/react";
import { PaymentMethodEnum } from "../../core/types";
import { useState } from "react";
import { cardOutline, cashOutline, walletOutline } from "ionicons/icons";

interface PaymentMethodProps {
  onPaymentMethodSelect: (paymentMethod: PaymentMethodEnum) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  onPaymentMethodSelect,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>(
    PaymentMethodEnum.CASH
  );

  const handlePaymentMethod = (paymentMethod: PaymentMethodEnum) => {
    setPaymentMethod(paymentMethod);
    onPaymentMethodSelect(paymentMethod);
  };

  return (
    <IonRow>
      <IonRadioGroup
        class="ion-radio-group-payment-method"
        value={paymentMethod}
      >
        <IonCol size="5">
          <IonCard
            button
            onClick={() => handlePaymentMethod(PaymentMethodEnum.CASH)}
            className={
              paymentMethod === PaymentMethodEnum.CASH ? "selected-method" : ""
            }
          >
            <IonCardContent className="ion-text-center">
              <IonIcon icon={cashOutline} size="large" />
              <IonCardSubtitle>Espèces</IonCardSubtitle>
            </IonCardContent>
          </IonCard>
        </IonCol>

        <IonCol size="5">
          <IonCard
            button
            onClick={() => handlePaymentMethod(PaymentMethodEnum.CB)}
            className={
              paymentMethod === PaymentMethodEnum.CB ? "selected-method" : ""
            }
          >
            <IonCardContent className="ion-text-center">
              <IonIcon icon={cardOutline} size="large" />
              <IonCardSubtitle>Carte</IonCardSubtitle>
            </IonCardContent>
          </IonCard>
        </IonCol>

        <IonCol size="5">
          <IonCard
            button
            onClick={() => handlePaymentMethod(PaymentMethodEnum.MOBILE)}
            className={
              paymentMethod === PaymentMethodEnum.MOBILE
                ? "selected-method"
                : ""
            }
          >
            <IonCardContent className="ion-text-center">
              <IonIcon icon={walletOutline} size="large" />
              <IonCardSubtitle>Mobile</IonCardSubtitle>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRadioGroup>
    </IonRow>
  );
};

export default PaymentMethod;
