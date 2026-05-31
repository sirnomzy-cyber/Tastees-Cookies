import { useState } from "react";

export interface CartItem {
  name: string;
  price: string;
  image: string;
  quantity: number;
  merchandiseId: string;
}

interface CartPageProps {
  cartItems: CartItem[];
  checkoutUrl: string | null;
  onUpdateQty: (name: string, delta: number) => void;
  onRemove: (name: string) => void;
  onClear: () => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

export default function CartPage({
  cartItems,
  checkoutUrl,
  onUpdateQty,
  onRemove,
  onClear,
  onContinueShopping,
  onCheckout,
}: CartPageProps) {
  const [removingItem, setRemovingItem] = useState<string | null>(null);

  const cartTotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  function handleRemove(name: string) {
    setRemovingItem(name);
    setTimeout(() => {
      onRemove(name);
      setRemovingItem(null);
    }, 300);
  }

  return (
    <div style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "60px" }}>
      <style>{`
        .cart-page-inner { max-width: 720px; margin: 0 auto; padding: 0 20px; }
        .cart-head { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 32px; }
        .cart-title { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800; margin: 0; color: #2a0d1e; }
        .cart-clear-btn { background: none; border: 1.5px solid rgba(180,50,100,0.25); color: #8a4a6a; font-size: 0.85rem; font-weight: 700; cursor: pointer; padding: 8px 18px; border-radius: 999px; transition: all 0.2s; font-family: inherit; }
        .cart-clear-btn:hover { background: rgba(180,50,100,0.08); }
        .cart-items-list { display: grid; gap: 14px; margin-bottom: 24px; }
        .cart-item-row { display: flex; align-items: center; gap: 16px; padding: 16px; background: #fff; border-radius: 18px; border: 1px solid rgba(130,60,150,0.12); box-shadow: 0 4px 16px rgba(107,31,168,0.06); transition: opacity 0.3s, transform 0.3s; }
        .cart-item-row.removing { opacity: 0; transform: translateX(20px); }
        .cart-item-img { width: 80px; height: 80px; object-fit: contain; border-radius: 12px; background: #f9f0ff; padding: 6px; flex-shrink: 0; }
        .cart-item-info { flex: 1; min-width: 0; }
        .cart-item-name { font-weight: 800; margin: 0 0 4px; color: #2a0d1e; }
        .cart-item-price { color: #d63a7a; font-weight: 700; margin: 0; }
        .cart-item-controls { display: flex; align-items: center; gap: 10px; }
        .cart-qty-stepper { display: flex; align-items: center; border: 1.5px solid rgba(107,31,168,0.2); border-radius: 50px; overflow: hidden; background: rgba(255,255,255,0.8); }
        .cart-qty-btn { width: 34px; height: 34px; border: 0; background: none; font-size: 1.1rem; font-weight: 700; color: #6b1fa8; cursor: pointer; display: grid; place-items: center; }
        .cart-qty-btn:hover { background: rgba(107,31,168,0.08); }
        .cart-qty-val { min-width: 28px; text-align: center; font-size: 0.9rem; font-weight: 700; color: #2a0d1e; }
        .cart-remove-btn { background: none; border: 0; color: #c0306a; font-size: 0.85rem; font-weight: 600; cursor: pointer; padding: 4px 8px; border-radius: 8px; transition: background 0.15s; font-family: inherit; }
        .cart-remove-btn:hover { background: rgba(192,48,106,0.08); }
        .cart-summary { padding: 24px; background: #fff; border-radius: 18px; border: 1px solid rgba(130,60,150,0.12); box-shadow: 0 4px 16px rgba(107,31,168,0.06); }
        .cart-summary-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .cart-summary-label { font-weight: 700; font-size: 1.1rem; color: #2a0d1e; }
        .cart-summary-total { font-weight: 800; font-size: 1.3rem; color: #d63a7a; }
        .cart-checkout-btn { width: 100%; justify-content: center; font-size: 1rem; display: flex; align-items: center; padding: 16px 28px; border-radius: 999px; background: linear-gradient(135deg, #6b1fa8, #b02878 58%, #d63a7a); color: #fffaf5; font-weight: 700; border: 0; cursor: pointer; box-shadow: 0 18px 36px rgba(107,31,168,0.28); font-family: inherit; transition: transform 0.2s; }
        .cart-checkout-btn:hover { transform: translateY(-2px); }
        .cart-continue-btn { display: block; width: 100%; text-align: center; margin-top: 14px; background: none; border: 0; color: #8a4a6a; font-size: 0.9rem; cursor: pointer; font-family: inherit; }
        .cart-empty { text-align: center; padding: 80px 0; }
        .cart-empty-emoji { font-size: 4rem; margin-bottom: 16px; }
        .cart-empty-text { color: #8a4a6a; font-size: 1.1rem; margin-bottom: 28px; }
        .cart-browse-btn { display: inline-flex; align-items: center; padding: 14px 28px; border-radius: 999px; background: linear-gradient(135deg, #6b1fa8, #b02878 58%, #d63a7a); color: #fffaf5; font-weight: 700; border: 0; cursor: pointer; font-family: inherit; font-size: 0.95rem; }
        .eyebrow-cart { display: flex; align-items: center; gap: 12px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: #d63a7a; margin-bottom: 8px; }
        .eyebrow-line { display: block; width: 28px; height: 2px; background: #d63a7a; border-radius: 2px; }
      `}</style>

      <div className="cart-page-inner">
        <div className="cart-head">
          <div>
            <p className="eyebrow-cart"><span className="eyebrow-line"></span> Your Order</p>
            <h1 className="cart-title">Your Cart</h1>
          </div>
          {cartItems.length > 0 && (
            <button
              className="cart-clear-btn"
              onClick={() => {
                if (window.confirm("Clear your entire cart?")) onClear();
              }}
            >
              🗑 Clear cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-emoji">🍪</div>
            <p className="cart-empty-text">Your cart is empty — let's fix that!</p>
            <button className="cart-browse-btn" onClick={onContinueShopping}>
              Browse Cookies
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div
                  key={item.name}
                  className={`cart-item-row${removingItem === item.name ? " removing" : ""}`}
                >
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">{item.price}</p>
                  </div>
                  <div className="cart-item-controls">
                    <div className="cart-qty-stepper">
                      <button className="cart-qty-btn" onClick={() => onUpdateQty(item.name, -1)}>−</button>
                      <span className="cart-qty-val">{item.quantity}</span>
                      <button className="cart-qty-btn" onClick={() => onUpdateQty(item.name, 1)}>+</button>
                    </div>
                    <button className="cart-remove-btn" onClick={() => handleRemove(item.name)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span className="cart-summary-label">Total</span>
                <span className="cart-summary-total">${cartTotal.toFixed(2)}</span>
              </div>
              <button className="cart-checkout-btn" onClick={onCheckout}>
                Proceed to Checkout →
              </button>
              <button className="cart-continue-btn" onClick={onContinueShopping}>
                ← Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
