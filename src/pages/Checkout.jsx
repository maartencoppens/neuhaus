import Button from "../components/Button";
import Card from "../components/Card";
import usePralineStore from "../store/usePralineStore";

const Checkout = () => {
  const boxPralines = usePralineStore((state) => state.boxPralines);

  const itemCount = boxPralines.length;
  const deliveryDate = "2-4 werkdagen";

  return (
    <section className="grid flex-1 grid-cols-1 gap-xl py-2xl lg:grid-cols-5 items-start">
      <div className="lg:col-span-3 flex flex-col gap-xl">
        <Card className="flex flex-col gap-md px-lg">
          <div className="flex items-center justify-between gap-md border-b border-border pb-sm">
            <div>
              <p className="label-text">order summary</p>
              <p className="text-lg font-bold">Your praline box</p>
            </div>
            <p className="text-sm text-text-light">{itemCount} pralines</p>
          </div>

          {itemCount > 0 ? (
            <div className="grid grid-cols-2 gap-sm sm:grid-cols-4">
              {boxPralines.map((praline) => (
                <div
                  key={praline.id}
                  className="flex flex-col gap-xs rounded-xs border border-border bg-background-secondary p-sm"
                >
                  <img
                    src={praline.image || "/fallback.webp"}
                    alt={praline.name}
                    className="h-20 w-full rounded-xs bg-white object-contain"
                  />
                  <span className="text-sm font-semibold">{praline.name}</span>
                  <span className="text-xs text-text-light">
                    {praline.filling}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xs border border-border bg-background-secondary p-md text-sm text-text-dark">
              Your box is still empty. Go back to the box overview to continue
              your selection.
            </div>
          )}
        </Card>

        <Card className="flex flex-col gap-sm px-lg">
          <p className="label-text">delivery</p>
          <div className="grid gap-sm sm:grid-cols-2">
            <div className="rounded-xs border border-border bg-background-secondary p-sm">
              <p className="text-sm text-text-light">Shipping</p>
              <p className="font-semibold">Home delivery</p>
              <p className="text-sm text-text-dark">{deliveryDate}</p>
            </div>
            <div className="rounded-xs border border-border bg-background-secondary p-sm">
              <p className="text-sm text-text-light">Gift option</p>
              <p className="font-semibold">Included</p>
              <p className="text-sm text-text-dark">Personal message ready</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2 flex flex-col gap-xl">
        <Card className="flex flex-col gap-md px-lg">
          <div>
            <p className="label-text">checkout details</p>
            <p className="text-lg font-bold">Delivery address</p>
          </div>

          <form className="flex flex-col gap-sm">
            <div className="flex flex-col gap-xs">
              <label className="text-sm text-text-dark" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-xs border border-border bg-background-primary px-md py-sm outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-sm text-text-dark" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xs border border-border bg-background-primary px-md py-sm outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-sm text-text-dark" htmlFor="address">
                Street address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Street and number"
                className="w-full rounded-xs border border-border bg-background-primary px-md py-sm outline-none focus:border-primary"
              />
            </div>

            <div className="grid gap-sm sm:grid-cols-2">
              <div className="flex flex-col gap-xs">
                <label className="text-sm text-text-dark" htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="Brussels"
                  className="w-full rounded-xs border border-border bg-background-primary px-md py-sm outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-sm text-text-dark" htmlFor="postal">
                  Postal code
                </label>
                <input
                  id="postal"
                  type="text"
                  placeholder="1000"
                  className="w-full rounded-xs border border-border bg-background-primary px-md py-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          </form>
        </Card>

        <Card className="flex flex-col gap-sm px-lg">
          <div className="flex items-center justify-between border-b border-border pb-sm">
            <p className="label-text">total</p>
            <p className="text-lg font-bold">€39.00</p>
          </div>

          <div className="flex flex-col gap-sm pt-sm">
            <Button label="Complete order" className="w-full uppercase" />
            <Button
              label="Back to box overview"
              link="/box"
              variant="secondary"
              className="w-full uppercase"
            />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Checkout;
