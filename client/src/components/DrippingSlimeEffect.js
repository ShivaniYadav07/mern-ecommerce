import React, { useEffect, useRef } from 'react';

class Drip {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.random() * 80 + 20;
    this.x = 2 * this.radius + (Math.random() * (this.effect.width - this.radius * 4));
    this.y = -this.radius;
    this.speedX = Math.random() * 0.2 - 0.1;
    this.speedY = Math.random() * 0.5 + 0.2;
    this.angle = 0;
    this.va = Math.random() * 0.1 - 0.05;
    this.range = Math.random() * 10;
    this.gravity = Math.random() * 0.005;
    this.vy = 0;
  }

  update() {
    if (this.x < this.radius || this.x > this.effect.width - this.radius) this.speedX *= -1;
    if (this.y > this.effect.height + this.radius) {
      this.radius = Math.random() * 120 + 30;
      this.y = -this.radius;
      this.vy = 0;
      this.speedY = Math.random() * 0.5 + 0.2;
      this.va = Math.random() * 0.1 - 0.05;
      this.x = this.radius * 2 + (Math.random() * (this.effect.width - this.radius * 4));
    }
    if (this.y > this.radius) {
      this.vy += this.gravity;
      this.speedY += this.vy;
      this.angle += this.va;
    }
    if (this.y > this.radius * 2) {
      this.radius -= 0.15;
      this.radius = Math.max(this.radius, 0); // Ensure the radius is not negative
    }
    this.x += this.speedX * Math.cos(this.angle) * this.range;
    this.y += this.speedY;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, Math.max(this.radius, 0), 0, Math.PI * 2); // Ensure the radius is not negative
    context.fill();
  }

  reset(effectWidth) {
    this.radius = Math.random() * 80 + 20;
    this.x = 2 * this.radius + (Math.random() * (effectWidth - this.radius * 4));
    this.y = -this.radius;
  }
}

class DrippingEffect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.drips = [];
  }

  init(numberOfDrops) {
    for (let i = 0; i < numberOfDrops; i++) {
      this.drips.push(new Drip(this));
    }
  }

  update() {
    this.drips.forEach(drip => drip.update());
  }

  draw(context) {
    this.drips.forEach(drip => drip.draw(context));
  }

  connectParticles(context) {
    // Remove unnecessary context.beginPath() and context.fill() calls
    // Do nothing here to avoid drawing lines
  }

  reset(newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
    this.drips.forEach(drip => drip.reset(newWidth));
  }
}

const DrippingSlimeEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let effect;

    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = 'white';
      effect.reset(canvas.width, canvas.height);
    };

    const initEffect = () => {
      effect = new DrippingEffect(canvas.width, canvas.height);
      effect.init(20);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      effect.update();
      effect.draw(ctx);
      effect.connectParticles(ctx);
      requestAnimationFrame(animate);
    };

    // Initialize the effect and start the animation
    initEffect();
    animate();

    // Event listener for window resize
    window.addEventListener('resize', resizeHandler);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default DrippingSlimeEffect;
